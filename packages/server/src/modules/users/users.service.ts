import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import bcrypt from 'bcryptjs'
import { ensureValid, reduceObject } from 'common/utils'
import { DeepPartial, Repository } from 'typeorm'
import uniqid from 'uniqid'
import { User, UserRegistration, TokenState, PasswordReset } from './users.entity'
import moment from 'moment'
import { plainToClass } from 'class-transformer'

const RESEND_EXPIRY = 3600
const RESET_PASSWORD_EXPIRY = 3600

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) readonly users: Repository<User>,
    @InjectRepository(UserRegistration)
    readonly tokens: Repository<UserRegistration>,
    @InjectRepository(PasswordReset)
    readonly passwordTokens: Repository<PasswordReset>
  ) { }

  public async findAll() {
    return await this.users.find()
  }

  public async findOne(params: DeepPartial<User>) {
    return (await this.users.findOne(params)) || null
  }

  public async create(user: User) {
    await ensureValid(user)
    const exists = !!(await this.users.findOne({
      email: user.email
    }))

    if (exists) {
      throw new BadRequestException('Email already exists.')
    }

    user.password = await bcrypt.hash(user.password, 10)
    try {
      await this.users.insert(user)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  public async getRegisterConfirmToken({
    registerToken,
    resendToken,
    allowConfirmed = true
  }: {
    registerToken?: string
    resendToken?: string
    allowConfirmed?: boolean
  }) {
    if (!registerToken && !resendToken) {
      throw new BadRequestException()
    }

    const registration = await this.tokens.findOne(
      reduceObject({
        registerToken,
        resendToken
      })
    )

    if (!registration) {
      throw new NotFoundException()
    }

    const expires = moment(registration.dateCreated).add(RESEND_EXPIRY, 'seconds')
    const now = moment()
    if (expires.isBefore(now)) {
      throw new BadRequestException()
    }

    if (allowConfirmed && registration.state === TokenState.Confirmed) {
      return registration
    }

    if (registration.state !== TokenState.Pending) {
      throw new BadRequestException()
    }

    return registration
  }

  public async getPasswordResetTokenState(resetToken: string) {
    const token = await this.passwordTokens.findOne({
      resetToken,
      state: TokenState.Pending
    })

    if (token) {
      const expires = moment(token.dateCreated).add(RESET_PASSWORD_EXPIRY, 'seconds')
      const now = moment()
      if (expires.isAfter(now)) {
        return {
          isValid: true,
          email: token.email
        }
      }
    }

    return { isValid: false, email: null }
  }

  public async completeRegistration({ registerToken }: { registerToken: string }) {
    const registration = await this.getRegisterConfirmToken({ registerToken, allowConfirmed: true })
    if (registration.state === TokenState.Confirmed) {
      return registration.email
    }

    const user = plainToClass(User, registration.userData)
    const exists = !!(await this.users.findOne({
      email: user.email
    }))

    if (exists) {
      throw new BadRequestException('Email already exists.')
    }

    await this.users.insert(user)
    await this.tokens.update({ email: user.email.toLowerCase() }, { state: TokenState.Canceled })
    await this.tokens.update({ registerToken }, { state: TokenState.Confirmed })
    return user.email
  }

  public async initiateRegistration(user: User) {
    await ensureValid(user)
    const exists = !!(await this.users.findOne({
      email: user.email
    }))

    if (exists) {
      throw new BadRequestException('Email already exists.')
    }

    const email = user.email.toLowerCase()
    user.password = await bcrypt.hash(user.password, 10)
    const registration = new UserRegistration()
    const resendToken = uniqid()
    registration.userData = user
    registration.state = TokenState.Pending
    registration.email = email
    registration.resendToken = resendToken

    let registerToken: string | null = null
    try {
      await this.tokens.update({ email }, { state: TokenState.Canceled })
    } catch {
      // ignored
    }

    try {
      const result = await this.tokens.insert(registration)
      registerToken = result.identifiers[0].registerToken
    } catch (error) {
      throw new BadRequestException(error)
    }

    return { registerToken, resendToken }
  }

  public async initiatePasswordReset(email: string) {
    const exists = !!(await this.users.findOne({
      email
    }))

    if (!exists) {
      throw new NotFoundException()
    }

    const reset = new PasswordReset()
    reset.email = email
    reset.state = TokenState.Pending

    let resetToken: string | null = null
    try {
      await this.passwordTokens.update({ email }, { state: TokenState.Canceled })
    } catch {
      // ignored
    }

    try {
      const result = await this.passwordTokens.insert(reset)
      resetToken = result.identifiers[0].resetToken
    } catch (error) {
      throw new BadRequestException(error)
    }

    return resetToken
  }

  public async resetPassword(resetToken: string, newPassword: string) {
    const request = await this.passwordTokens.findOne({ resetToken, state: TokenState.Pending })

    if (!request) {
      throw new NotFoundException()
    }

    const { email, dateCreated } = request

    const expires = moment(dateCreated).add(RESET_PASSWORD_EXPIRY, 'seconds')
    const now = moment()
    if (expires.isBefore(now)) {
      throw new BadRequestException()
    }

    const password = await bcrypt.hash(newPassword, 10)

    await this.passwordTokens.update({ resetToken }, { state: TokenState.Confirmed })
    return await this.users.update({ email }, { password })
  }

  public async match(email: string, password: string) {
    const user = await this.findOne({ email })
    if (!user) {
      return null
    }

    if (await bcrypt.compare(password, user.password)) {
      return user
    } else {
      return null
    }
  }
}

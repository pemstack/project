import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import bcrypt from 'bcrypt'
import { ensureValid } from 'common/utils'
import { DeepPartial, Repository } from 'typeorm'
import { User } from './users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) readonly repository: Repository<User>
  ) { }

  public async findAll() {
    return await this.repository.find()
  }

  public async findOne(params: DeepPartial<User>) {
    return await this.repository.findOne(params) || null
  }

  public async create(user: User) {
    await ensureValid(user)
    user.password = await bcrypt.hash(user.password, 10)
    try {
      return await this.repository.insert(user)
    } catch (error) {
      throw new BadRequestException(error)
    }
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

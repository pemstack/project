import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { InjectEntityManager, TypeOrmModule } from '@nestjs/typeorm'
import { User, PasswordReset, UserRegistration } from 'modules/users'
import { Invitation } from 'modules/courses'

export const imports = [
  TypeOrmModule.forFeature([User, PasswordReset, UserRegistration, Invitation])
]

@Injectable()
export default class EmailsLowercaseTask {
  constructor(
    @InjectEntityManager() readonly entities: EntityManager
  ) { }

  async run(args: string[]) {
    await this
      .entities
      .createQueryBuilder()
      .update(User)
      .set({ email: () => 'lower(email)' })
      .execute()

    await this
      .entities
      .createQueryBuilder()
      .update(PasswordReset)
      .set({ email: () => 'lower(email)' })
      .execute()

    await this
      .entities
      .createQueryBuilder()
      .update(UserRegistration)
      .set({ email: () => 'lower(email)' })
      .execute()

    await this
      .entities
      .createQueryBuilder()
      .update(Invitation)
      .set({ userEmail: () => 'lower(userEmail)' })
      .execute()
  }
}

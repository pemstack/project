import { Injectable } from '@nestjs/common'
import { UsersService, User, UserRole, UserStatus, UsersModule } from 'modules/users'

export const imports = [UsersModule]

@Injectable()
export default class AddAdminTask {
  constructor(
    private readonly usersService: UsersService
  ) { }

  async run(args: string[]) {
    console.log('Adding admin user...')
    console.log('Args:', args)
    await this.usersService.create(new User({
      firstname: 'First',
      lastname: 'Last',
      email: 'admin@example.com',
      password: '123456',
      role: UserRole.ADMIN,
      status: UserStatus.CONFIRMED
    }))

    console.log('User added!')
  }
}

import { Injectable } from '@nestjs/common'
import { UsersService, User, UsersModule } from 'modules/users'

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
      firstName: 'First',
      lastName: 'Last',
      email: 'admin@example.com',
      password: '123456'
    }))

    console.log('User added!')
  }
}

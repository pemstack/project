import { Injectable } from '@nestjs/common'
import { AuthModule, AuthService } from 'modules/auth'

export const imports = [AuthModule]

@Injectable()
export default class AddAdminTask {
  constructor(
    private readonly authService: AuthService
  ) { }

  async run(args: string[]) {
    const [, , username, password] = args
    const response = await this.authService.login(username, password)
    if (response) {
      console.log(response)
    } else {
      console.log('Could not create token with the provided details.')
    }
  }
}

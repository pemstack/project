import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy as StrategyBase } from 'passport'

class Strategy extends StrategyBase {
  constructor() {
    super()
    this.name = 'anonymous'
  }

  authenticate() {
    this.success({})
  }
}

@Injectable()
export class AnonymousStrategy extends PassportStrategy(Strategy) {
  async validate(): Promise<null> {
    return null
  }
}

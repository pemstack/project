import { prop, Typegoose } from 'typegoose'

class Account extends Typegoose {
  @prop({ required: true })
  name: string
}

export type AccountType = Account

export default new Account().getModelForClass(Account)

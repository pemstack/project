import { prop, Typegoose } from 'typegoose'

class Todo extends Typegoose {
  @prop({ required: true })
  title: string

  @prop({ default: false })
  done: boolean
}

export type TodoType = Todo

export default new Todo().getModelForClass(Todo)

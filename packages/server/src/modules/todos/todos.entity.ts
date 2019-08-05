import { Field, Int, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Todo {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  done: boolean
}

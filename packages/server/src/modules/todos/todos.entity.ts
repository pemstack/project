import { ApiModelProperty } from '@nestjs/swagger'
import { Field, Int, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Todo {
  @ApiModelProperty()
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number

  @ApiModelProperty()
  @Field()
  @Column()
  title: string

  @ApiModelProperty()
  @Field()
  @Column()
  done: boolean
}

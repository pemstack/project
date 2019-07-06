import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodosController } from './todos.controller'
import { Todo } from './todos.entity'
import { TodosService } from './todos.service'

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodosService],
  controllers: [TodosController],
  exports: [TodosService]
})
export class TodosModule { }

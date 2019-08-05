import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodosController } from './todos.controller'
import { Todo } from './todos.entity'
import { TodosService } from './todos.service'
import { TodosResolver } from './todos.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodosService, TodosResolver],
  controllers: [TodosController],
  exports: [TodosService]
})
export class TodosModule { }

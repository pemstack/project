import { Todo } from 'entity'
import {
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  OnUndefined,
  NotFoundError,
  JsonController
} from 'routing-controllers'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import {
  IsBooleanString,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator'

class CreateTodo {
  @IsString()
  @MinLength(5)
  title: string

  @IsOptional()
  @IsBooleanString()
  done?: boolean
}

@JsonController('/todos')
export class TodosController {
  @InjectRepository(Todo)
  repository: Repository<Todo>

  @Get('/')
  async getTodos() {
    const todos = await this.repository.find()
    return todos
  }

  @Get('/:id')
  async getTodo(@Param('id') id: number) {
    const todo = await this.repository.findOne(id)
    return todo
  }

  @Post('/')
  @OnUndefined(204)
  async createTodo(@Body({ validate: true }) todo: CreateTodo) {
    await this.repository.insert(todo)
  }

  @Delete('/:id')
  @OnUndefined(200)
  async delete(@Param('id') id: number) {
    await this.repository.delete(id)
  }

  @Delete('/')
  @OnUndefined(200)
  async deleteAll() {
    await this.repository.clear()
  }
}

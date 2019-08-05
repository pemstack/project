import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiResponse, ApiUseTags } from '@nestjs/swagger'
import { CreateTodoRequest, TodoResponse } from './todos.dto'
import { TodosService } from './todos.service'

@ApiUseTags('todos')
@Controller('todos')
export class TodosController {
  private get repository() {
    return this.todos.repository
  }

  constructor(
    private readonly todos: TodosService
  ) { }

  @ApiResponse({ status: 200, type: [TodoResponse] })
  @Get()
  async getTodos() {
    const todos = await this.repository.find()
    return todos
  }

  @ApiResponse({ status: 200, type: TodoResponse })
  @Get(':id')
  async getTodo(@Param('id') id: number) {
    const todo = await this.repository.findOne(id)
    return todo
  }

  @Post()
  async createTodo(@Body() todo: CreateTodoRequest) {
    await this.repository.insert(todo)
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.repository.delete(id)
  }

  @Delete()
  async deleteAll() {
    await this.repository.clear()
  }
}

import { Resolver, Query } from '@nestjs/graphql'
import { Todo } from './todos.entity'
import { TodosService } from './todos.service'

@Resolver(of => Todo)
export class TodosResolver {
  constructor(
    private readonly todosService: TodosService
  ) { }

  @Query(returns => [Todo], { nullable: true })
  async todos() {
    return await this.todosService.repository.find() || []
  }
}

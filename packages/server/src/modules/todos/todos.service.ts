import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Todo } from './todos.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    public readonly repository: Repository<Todo>
  ) { }
}

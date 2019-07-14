import { controller, view } from 'app'
import { TodosController } from './todos.controller'
import TodosView from './todos.view'

export default controller(TodosController, view(TodosView))

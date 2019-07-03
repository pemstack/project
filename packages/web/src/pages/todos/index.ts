import { controller, view } from 'app'
import TodosController from './TodosController'
import TodosView from './TodosView'

export default controller(TodosController, view(TodosView))

import { controller, view } from 'app'
import { TodosMobxController } from './todos-mobx.controller'
import { TodosMobxView } from './todos-mobx.view'

export default controller(TodosMobxController, view(TodosMobxView))

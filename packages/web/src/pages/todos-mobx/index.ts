import { authorize, controller, view  } from 'app'
import { TodosMobxController } from './todos-mobx.controller'
import { TodosMobxView } from './todos-mobx.view'

export default authorize({
  action: controller(TodosMobxController, view(TodosMobxView))
})

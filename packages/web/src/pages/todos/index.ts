import { authorize, view } from 'app'
import { TodosView } from './todos.view'

export default authorize({
  action: view(TodosView)
})

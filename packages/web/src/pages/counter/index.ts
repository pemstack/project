import { controller, view } from 'app'
import { CounterController } from './CounterController'
import CounterView from './CounterView'

export default controller(CounterController, view(CounterView))

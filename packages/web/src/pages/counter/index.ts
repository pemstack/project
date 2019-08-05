import { controller, view } from 'app'
import { CounterController } from './counter.controller'
import { CounterView } from './counter.view'

export default controller(CounterController, view(CounterView))

import { type Action } from './storeTypes'

const nullAction: Action<never> = {
  type: 'null'
}

export default nullAction

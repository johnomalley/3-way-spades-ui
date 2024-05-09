import { type Action } from './types'

const nullAction: Action<never> = {
  type: 'unknown'
}

export default nullAction

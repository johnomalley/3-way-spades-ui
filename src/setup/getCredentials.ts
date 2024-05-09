import { type State } from '../store/types'
import { type Credentials } from './setupReducer'

export default ({ setup: { apiKey, playerId } }: State): Credentials => ({
  apiKey,
  playerId
})

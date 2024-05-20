import { type State } from '../store/storeTypes'
import { type Credentials } from './setupReducer'

export default ({ setup: { apiKey, playerId } }: State): Credentials => ({
  apiKey,
  playerId
})

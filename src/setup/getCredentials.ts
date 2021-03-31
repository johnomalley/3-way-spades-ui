import { State } from '../store/types'
import { Credentials } from './setupReducer'

export default ({ setup: { apiKey, playerId } }: State): Credentials => ({
  apiKey,
  playerId
})

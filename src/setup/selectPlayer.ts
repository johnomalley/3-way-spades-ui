import { type State } from '../store/storeTypes'
import { type Player } from './setupReducer'

const selectPlayer = ({ setup: { credentials, players } }: State): Player => {
  const player = players[credentials.playerId]
  if (player) {
    return player
  } else {
    throw new Error('no current player in app state')
  }
}

export default selectPlayer

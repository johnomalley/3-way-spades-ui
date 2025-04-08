import { type State } from '../store/storeTypes'
import { type PlayersById } from './setupReducer'

const selectPlayersById = ({ setup }: State): PlayersById => setup.players

export default selectPlayersById

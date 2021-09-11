import { Action } from '../store/types'
import nullAction from '../store/nullAction'
import { gameListActions, gameListError, gameListGet, gameListUpdate } from './actions'

export type Player = Readonly<{
  id: string
  name: string
  number: number
  points: number
}>

export type Game = Readonly<{
  id: string
  startTime: string
  endTime?: string
  timestamp: number
  winningScore: number
  players: readonly Player[]
  handCount: number
}>

export type GameListState = Readonly<{
  games: readonly Game[]
  busy: boolean
  error?: Error
}>

const initialState: GameListState = {
  games: [],
  busy: false
}

export type GameListActionType = typeof gameListActions[number]

export default (state: GameListState = initialState, action: Action = nullAction): GameListState => {
  switch (action.type) {
    case gameListGet:
      return {
        ...state,
        games: [],
        busy: true,
        error: undefined
      }
    case gameListUpdate:
      return {
        ...state,
        busy: false,
        games: action.payload
      }
    case gameListError:
      return {
        ...state,
        busy: false,
        error: action.payload
      }
    default:
      return state
  }
}

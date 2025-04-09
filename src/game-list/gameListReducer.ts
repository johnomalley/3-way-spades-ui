import { type Action } from '../store/storeTypes'
import nullAction from '../store/nullAction'
import {
  type gameListActions,
  gameListClearDeletedGame,
  gameListConfirmDelete,
  gameListDelete,
  gameListError,
  gameListGet,
  gameListUpdate
} from './gameListActions'

export type GamePlayer = Readonly<{
  id: string
  displayName: string
  number: number
  points: number
}>

export type Game = Readonly<{
  id: string
  startTime: string
  endTime?: string
  timestamp: number
  winningScore: number
  players: readonly GamePlayer[]
  handCount: number
}>

export type GameListState = Readonly<{
  games: readonly Game[]
  busy: boolean
  error?: Error
  deleteGameId?: string
}>

const initialState: GameListState = {
  games: [],
  busy: false
}

export type GameListActionType = typeof gameListActions[number]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const clearDeletedGame = ({ deleteGameId, ...rest }: GameListState): GameListState => rest

export default (state: GameListState = initialState, action: Action<unknown> = nullAction): GameListState => {
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
        games: action.payload as readonly Game[]
      }
    case gameListError:
      return {
        ...state,
        busy: false,
        error: action.payload as Error
      }
    case gameListDelete:
      return {
        ...state,
        deleteGameId: action.payload as string
      }
    case gameListConfirmDelete:
      return { ...state, busy: true }
    case gameListClearDeletedGame:
      return clearDeletedGame(state)
    default:
      return state
  }
}

import { type RouterState } from 'connected-react-router'
import { type History } from 'history'
import { type SetupState, type SetupActionType } from '../setup/setupReducer'
import { type GameListActionType, type GameListState } from '../game-list/gameListReducer'
import { type GameActionType, type GameState } from '../game/gameReducer'

type UnknownActionType = 'unknown'

export type ActionType = SetupActionType | GameListActionType | GameActionType | UnknownActionType

export type Action<T> = Readonly<{
  type: ActionType
  payload?: T
}>

export type State = Readonly<{
  setup: SetupState
  gameList: GameListState
  game: GameState
  router: RouterState
  history: History
}>

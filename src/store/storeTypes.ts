import { type History } from 'history'
import { type SetupState, type SetupActionType } from '../setup/setupReducer'
import { type GameListActionType, type GameListState } from '../game-list/gameListReducer'
import { type GameActionType, type GameState } from '../game/gameReducer'
import { type GameStatsActionType, type GameStatsState } from '../game-stats/gameStatsReducer'
import { RouterState } from 'redux-first-history'

type NullActionType = 'null'

export type ActionType = SetupActionType | GameListActionType | GameStatsActionType | GameActionType | NullActionType

export type Action<T> = Readonly<{
  type: ActionType
  payload?: T
}>

export type State = Readonly<{
  setup: SetupState
  gameList: GameListState
  gameStats: GameStatsState
  game: GameState
  router: RouterState
  history: History
}>

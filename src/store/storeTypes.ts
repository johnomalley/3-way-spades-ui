import type { History } from 'history'
import type { SetupState, SetupActionType } from '../setup/setupReducer'
import type { GameListActionType, GameListState } from '../game-list/gameListReducer'
import type { GameActionType, GameState } from '../game/gameReducer'
import type { GameStatsActionType, GameStatsState } from '../game-stats/gameStatsReducer'
import type { RouterState } from '../router/routerReducer'

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

import { RouterState } from 'connected-react-router'
import { History } from 'history'
import { SetupState, SetupActionType } from '../setup/setupReducer'
import { GameListActionType, GameListState } from '../game-list/gameListReducer'
import { GameActionType, GameState } from '../game/gameReducer'

type UnknownActionType = 'unknown'

export type ActionType = SetupActionType | GameListActionType | GameActionType | UnknownActionType

export type Action = Readonly<{
  type: ActionType
  payload?: any
}>

export type State = Readonly<{
  setup: SetupState
  gameList: GameListState
  game: GameState
  router: RouterState
  history: History
}>

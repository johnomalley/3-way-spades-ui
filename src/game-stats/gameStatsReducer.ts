import { type Action } from '../store/types'
import nullAction from '../store/nullAction'
import { type gameStatsActions, gameStatsError, gameStatsUpdate } from './gameStatsActions'

export type GameStats = Readonly<{
  startTime: string
  endTime: string
  winners: readonly string[]
}>

export type GameStatsSummary = Readonly<{
  winCounts: Readonly<Record<string, number>>
  gameCount: number
  recentGames: readonly GameStats[]
}>

export type GameStatsState = Readonly<{
  summary?: GameStatsSummary
  error?: Error
}>

export type GameStatsActionType = typeof gameStatsActions[number]

const initialState: GameStatsState = {}

export default (state: GameStatsState = initialState, action: Action<unknown> = nullAction) => {
  switch (action.type) {
    case gameStatsUpdate:
      return {
        ...state,
        summary: action.payload as GameStatsSummary
      }
    case gameStatsError:
      return {
        ...state,
        error: action.payload as Error
      }
    default:
      return state
  }
}

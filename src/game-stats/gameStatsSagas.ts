import { call, type CallEffect, put, type PutEffect, takeEvery } from 'redux-saga/effects'
import api from '../api/api'
import { gameStatsGet, gameStatsUpdate, gameStatsError } from './gameStatsActions'
import { type GameStatsSummary } from './gameStatsReducer'

const putError = (error: Error) => put({ type: gameStatsError, payload: error })

export function * getStats (): Generator<CallEffect | PutEffect, void, GameStatsSummary> {
  try {
    const summary: GameStatsSummary = yield call(api.get, 'stats-summary')
    yield put({ type: gameStatsUpdate, payload: summary })
  } catch (error) {
    yield putError(error as Error)
  }
}

export function * watchGetStats () {
  yield takeEvery(gameStatsGet, getStats)
}

export default () => [
  watchGetStats()
]

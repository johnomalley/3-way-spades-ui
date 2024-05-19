import { call, put, takeEvery } from 'redux-saga/effects'
import api from '../api/api'
import { gameStatsGet, gameStatsUpdate, gameStatsError } from './gameStatsActions'

const putError = (error: Error) => put({ type: gameStatsError, payload: error })

export function * getStats (): any {
  try {
    const summary = yield call(api.get, 'stats-summary')
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

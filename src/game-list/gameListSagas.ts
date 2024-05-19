import { call, put, takeEvery } from 'redux-saga/effects'
import api from '../api/api'
import { gameListError, gameListGet, gameListNew, gameListUpdate } from './gameListActions'
import push from '../common/push'

const putError = (error: Error) => put({ type: gameListError, payload: error })

export function * getGames (): any {
  try {
    const games = yield call(api.get, 'games/active')
    yield put({ type: gameListUpdate, payload: games })
  } catch (error) {
    yield putError(error as Error)
  }
}

export function * newGame () {
  try {
    const { id } = yield call(api.post, 'new', { players: [] })
    yield push(`games/${id}`)
  } catch (error) {
    yield putError(error as Error)
  }
}

export function * watchGetGames () {
  yield takeEvery(gameListGet, getGames)
}

export function * watchNewGame () {
  yield takeEvery(gameListNew, newGame)
}

export default () => [
  watchGetGames(),
  watchNewGame()
]

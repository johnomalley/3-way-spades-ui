import type { CallEffect, PutEffect } from 'redux-saga/effects'
import { call, put, takeEvery } from 'redux-saga/effects'
import api from '../api/api'
import { gameListClearDeletedGame, gameListConfirmDelete, gameListError, gameListGet, gameListNew, gameListUpdate } from './gameListActions'
import type { Action } from '../store/storeTypes'
import type { Player } from '../setup/setupReducer'
import { push } from '../router/routerActions'

const putError = (error: Error) => put({ type: gameListError, payload: error })

export function * getGames (): Generator<CallEffect | PutEffect> {
  try {
    const games = yield call(api.get, 'games/active')
    yield put({ type: gameListUpdate, payload: games })
  } catch (error) {
    yield putError(error as Error)
  }
}

export function * newGame (): Generator<CallEffect | PutEffect, void, { id: string }> {
  try {
    const { id } = yield call(api.post, 'new', {})
    yield put(push(`/games/${id}`))
  } catch (error) {
    yield putError(error as Error)
  }
}

export function * confirmDeleteGame ({ payload }: Action<string>): Generator<PutEffect | CallEffect, void, Player > {
  yield put({ type: gameListClearDeletedGame })
  try {
    yield call(api.delete, `game/${payload}`)
    yield put({ type: gameListGet })
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

export function * watchConfirmDeleteGame () {
  yield takeEvery(gameListConfirmDelete, confirmDeleteGame)
}

export default () => [
  watchGetGames(),
  watchNewGame(),
  watchConfirmDeleteGame()
]

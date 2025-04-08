import { call, type CallEffect, put, type PutEffect, select, type SelectEffect, takeEvery, takeLatest } from 'redux-saga/effects'
import { type State } from '../store/storeTypes'
import {
  credentialsInit,
  credentialsSave,
  credentialsUpdate,
  playersError,
  playersGet,
  playersUpdate
} from './setupActions'
import { type Credentials, type Player, type SetupStatus } from './setupReducer'
import api from '../api/api'

const parseLocalCredentials = (): Credentials => {
  try {
    const { apiKey, playerId } = JSON.parse(localStorage.credentials as string)
    if (typeof apiKey === 'string' && typeof playerId === 'string') {
      return { apiKey: apiKey.trim(), playerId: playerId.trim().toLowerCase() }
    }
  } catch (error) {
    // bad local storage - ignore
  }
  return {
    apiKey: '',
    playerId: ''
  }
}

export function * initCredentials (): Generator<PutEffect | SelectEffect, void, SetupStatus> {
  const credentials = parseLocalCredentials()
  yield put({ type: credentialsUpdate, payload: credentials })
  const status = yield select((state: State) => state.setup.status)
  if (status === 'valid') {
    yield put({ type: credentialsSave })
  }
}

const selectCredentials = (state: State): Credentials => state.setup.credentials

export function * getPlayers (): Generator<SelectEffect | CallEffect | PutEffect, void, Credentials | Player[]> {
  const credentials = (yield select(selectCredentials)) as Credentials
  api.setApiKey(credentials.apiKey)
  try {
    const players = (yield call(api.get, 'players')) as Player[]
    yield put({ type: playersUpdate, payload: players })
  } catch (error) {
    yield put({ type: playersError, payload: error })
  }
}

export function * saveCredentials (): Generator<SelectEffect | PutEffect, void, Credentials> {
  const credentials = yield select(selectCredentials)
  localStorage.credentials = JSON.stringify(credentials)
}

export function * watchInitCredentials () {
  yield takeEvery(credentialsInit, initCredentials)
}

export function * watchSaveCredentials () {
  yield takeEvery(credentialsSave, saveCredentials)
}

export function * watchGetPlayers () {
  yield takeLatest(playersGet, getPlayers)
}

export default () => [
  watchInitCredentials(),
  watchSaveCredentials(),
  watchGetPlayers()
]

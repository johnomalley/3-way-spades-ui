import { put, takeEvery, select } from 'redux-saga/effects'
import { Action } from '../store/types'
import { credentialsInit, credentialsSave, credentialsUpdate } from './actions'
import getCredentials from './getCredentials'
import { Credentials } from './setupReducer'
import api from '../api/api'
import isString = require('lodash/isString')

const asString = (propertyName: string, value: any) =>
  value && isString(value) ? { [propertyName]: value } : {}

const maybeSetApiKey = ({ apiKey }: Credentials) => {
  if (apiKey) {
    api.setApiKey(apiKey)
  }
}

export function * initCredentials () {
  try {
    const { apiKey, playerId } = JSON.parse(localStorage.credentials)
    const payload = {
      ...asString('apiKey', apiKey),
      ...asString('playerId', playerId)
    }
    maybeSetApiKey(payload)
    yield put({ type: credentialsUpdate, payload })
  } catch (error) {
    // nothing to do
  }
}

export function * saveCredentials ({ payload }: Action): any {
  const credentials = yield select(getCredentials)
  localStorage.credentials = JSON.stringify({ ...credentials, ...payload })
  maybeSetApiKey(payload)
  yield put({ type: credentialsUpdate, payload })
}

export function * watchInitCredentials () {
  yield takeEvery(credentialsInit, initCredentials)
}

export function * watchSaveCredentials () {
  yield takeEvery(credentialsSave, saveCredentials)
}

export default () => [
  watchInitCredentials(),
  watchSaveCredentials()
]

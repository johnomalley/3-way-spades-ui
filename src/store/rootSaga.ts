import { all } from 'redux-saga/effects'
import setupSagas from '../setup/setupSagas'
import gameListSagas from '../game-list/gameListSagas'
import gameSagas from '../game/gameSagas'

export default function * rootSaga () {
  yield all([
    ...setupSagas(),
    ...gameListSagas(),
    ...gameSagas()
  ])
}

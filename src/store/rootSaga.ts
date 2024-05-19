import { all } from 'redux-saga/effects'
import setupSagas from '../setup/setupSagas'
import gameListSagas from '../game-list/gameListSagas'
import gameSagas from '../game/gameSagas'
import gameStatsSagas from '../game-stats/gameStatsSagas'

export default function * rootSaga () {
  yield all([
    ...setupSagas(),
    ...gameListSagas(),
    ...gameStatsSagas(),
    ...gameSagas()
  ])
}

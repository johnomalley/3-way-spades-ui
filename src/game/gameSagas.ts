import { call, put, takeEvery, select } from 'redux-saga/effects'
import api from '../api/api'
import { gameBid, gameError, gameGet, gamePlay, gameUpdate } from './actions'
import push from '../common/push'
import { Action, State } from '../store/types'
import isNotFound from '../api/isNotFound'

const putError = (error: Error) => put({ type: gameError, payload: error })

const getPlayerId = ({ setup: { playerId } }: State) => playerId

export function * getGame ({ payload }: Action) {
  try {
    const playerId = yield select(getPlayerId)
    const playerView = yield call(api.get, `game/${payload}/player/${playerId}`)
    yield put({ type: gameUpdate, payload: playerView })
  } catch (error) {
    if (isNotFound(error)) {
      yield push('/games')
    } else {
      yield putError(error)
    }
  }
}

const getGamePath = (state: State) =>
  `game/${state.game.playerView!.gameId}/player/${state.setup.playerId}`

type PostArgs = Readonly<{
  path: string
  body: object
}>

function * post({ path, body }: PostArgs) {
  try {
    const playerView = yield call(api.post, path, body)
    yield put({  type: gameUpdate, payload: playerView })
  } catch (error) {
    yield putError(error)
  }
}

export function * bid ({ payload }: Action) {
  const getBidArgs = (state: State) => ({
    path: `${getGamePath(state)}/bid`,
    body: { value: payload }
  })
  const args = yield select(getBidArgs)
  yield post(args)
}

export function * play ({ payload }: Action) {
  const getPlayArgs = (state: State) => ({
    path: `${getGamePath(state)}/play`,
    body: payload
  })
  const args = yield select(getPlayArgs)
  yield post(args)
}

export function * watchGetGame () {
  yield takeEvery(gameGet, getGame)
}

export function * watchBid () {
  yield takeEvery(gameBid, bid)
}

export function * watchPlay () {
  yield takeEvery(gamePlay, play)
}

export default () => [
  watchGetGame(),
  watchBid(),
  watchPlay()
]

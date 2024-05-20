import { call, put, takeEvery, select } from 'redux-saga/effects'
import api from '../api/api'
import { gameBid, gameError, gameGet, gamePlay, gameShowCards, gameUpdate } from './gameActions'
import push from '../common/push'
import { type Action, type State } from '../store/storeTypes'
import isNotFound from '../api/isNotFound'
import { type Card } from './gameReducer'

const putError = (error: Error) => put({ type: gameError, payload: error })

const getPlayerId = ({ setup: { playerId } }: State) => playerId

export function * getGame ({ payload }: Action<string>): any {
  try {
    const playerId = yield select(getPlayerId)
    const playerView = yield call(api.get, `game/${payload}/player/${playerId}`)
    yield put({ type: gameUpdate, payload: playerView })
  } catch (error) {
    if (isNotFound(error)) {
      yield push('/games')
    } else {
      yield putError(error as Error)
    }
  }
}

const getGamePath = (state: State) =>
  `game/${state.game.playerView!.gameId}/player/${state.setup.playerId}`

type PostArgs = Readonly<{
  path: string
  body: object
}>

function * post ({ path, body }: PostArgs): unknown {
  try {
    const playerView = yield call(api.post, path, body)
    yield put({ type: gameUpdate, payload: playerView })
  } catch (error) {
    yield putError(error as Error)
  }
}

export function * showCards (): any {
  const getShowArgs = (state: State) => ({
    path: `${getGamePath(state)}/show`,
    body: {}
  })
  const args = yield select(getShowArgs)
  yield post(args as PostArgs)
}

export function * bid ({ payload }: Action<number>): any {
  const getBidArgs = (state: State) => ({
    path: `${getGamePath(state)}/bid`,
    body: { value: payload }
  })
  const args = yield select(getBidArgs)
  yield post(args as PostArgs)
}

export function * play ({ payload }: Action<Card>): any {
  const getPlayArgs = (state: State) => ({
    path: `${getGamePath(state)}/play`,
    body: payload
  })
  const args = yield select(getPlayArgs)
  yield post(args as PostArgs)
}

export function * watchGetGame () {
  yield takeEvery(gameGet, getGame)
}

export function * watchShowCards () {
  yield takeEvery(gameShowCards, showCards)
}

export function * watchBid () {
  yield takeEvery(gameBid, bid)
}

export function * watchPlay () {
  yield takeEvery(gamePlay, play)
}

export default () => [
  watchShowCards(),
  watchGetGame(),
  watchBid(),
  watchPlay()
]

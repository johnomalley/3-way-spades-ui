import { call, put, takeEvery, select, type SelectEffect, type CallEffect, type PutEffect } from 'redux-saga/effects'
import api from '../api/api'
import { gameBid, gameError, gameGet, gamePlay, gameShowCards, gameUpdate } from './gameActions'
import { push } from '../router/routerActions'
import { type Action, type State } from '../store/storeTypes'
import isNotFound from '../api/isNotFound'
import { type Card, type PlayerView } from './gameReducer'
import selectPlayer from '../setup/selectPlayer'
import { type Player } from '../setup/setupReducer'

const putError = (error: Error) => put({ type: gameError, payload: error })

export function * getGame ({ payload }: Action<string>): Generator<SelectEffect | CallEffect | PutEffect, void, Player | PlayerView> {
  try {
    const player = yield select(selectPlayer)
    const playerView = yield call(api.get, `game/${payload}/player/${(player as Player).id}`)
    yield put({ type: gameUpdate, payload: playerView })
  } catch (error) {
    if (isNotFound(error)) {
      yield put(push('/games'))
    } else {
      yield putError(error as Error)
    }
  }
}

const getGamePath = ({ game, setup: { credentials: { playerId } } }: State) =>
  `game/${game.playerView!.gameId}/player/${playerId}`

type PostArgs = Readonly<{
  path: string
  body: object
}>

type Post = Generator<CallEffect | PutEffect>

function * post ({ path, body }: PostArgs): Post {
  try {
    const playerView = yield call(api.post, path, body)
    yield put({ type: gameUpdate, payload: playerView })
  } catch (error) {
    yield putError(error as Error)
  }
}

type ShowArgs = Readonly<{ path: string, body: object }>

const getShowArgs = (state: State): ShowArgs => ({
  path: `${getGamePath(state)}/show`,
  body: {}
})

export function * showCards (): Generator<SelectEffect | CallEffect | Post, void, ShowArgs> {
  const args = yield select(getShowArgs)
  yield post(args as PostArgs)
}

export function * bid ({ payload }: Action<number>): Generator<SelectEffect | Generator> {
  const getBidArgs = (state: State) => ({
    path: `${getGamePath(state)}/bid`,
    body: { value: payload }
  })
  const args = yield select(getBidArgs)
  yield post(args as PostArgs)
}

export function * play ({ payload }: Action<Card>): Generator<SelectEffect | CallEffect | Generator> {
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

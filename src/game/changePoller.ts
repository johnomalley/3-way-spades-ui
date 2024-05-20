import { type Dispatch } from 'redux'
import { type State } from '../store/storeTypes'
import api from '../api/api'
import { gameUpdate } from './gameActions'

type Config = Readonly<{
  dispatch: Dispatch
  getState: () => State
}>

interface PollerState {
  running: boolean
  timeout: number
  ticks: number
  lastTimestamp: number
}

const initialPollerState: PollerState = Object.freeze({
  running: false,
  timeout: 0,
  ticks: 0,
  lastTimestamp: 0
})

let pollerState: PollerState = {
  ...initialPollerState
}

let config: Config

const init = (initConfig: Config) => {
  config = initConfig
}

const getCurrentDelay = () => {
  const { ticks } = pollerState
  if (ticks < 50) {
    return 200
  } else if (ticks < 200) {
    return 1000
  } else if (ticks < 500) {
    return 5000
  } else {
    return 30000
  }
}

const poll = async () => {
  try {
    const { setup: { playerId }, game: { playerView } } = config.getState()
    if (playerView) {
      const { gameId, timestamp } = playerView
      const { update } = await api.get(`poll/${gameId}/${playerId}/${timestamp}`)
      if (update) {
        config.dispatch({ type: gameUpdate, payload: update })
        pollerState.ticks = 0
      } else if (pollerState.lastTimestamp === timestamp) {
        pollerState.ticks++
      } else {
        pollerState.lastTimestamp = timestamp
        pollerState.ticks = 0
      }
    }
    pollNext()
  } catch (error) {
    console.error(error)
  }
}

const pollNext = () => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  pollerState.timeout = window.setTimeout(poll, getCurrentDelay())
}

const start = () => {
  if (!pollerState.running) {
    pollerState = {
      ...initialPollerState,
      running: true
    }
    pollNext()
  }
}

const stop = () => {
  clearTimeout(pollerState.timeout)
  pollerState = {
    ...initialPollerState
  }
}

export default {
  init,
  start,
  stop
}

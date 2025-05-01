import { type Dispatch } from 'redux'
import { type State } from '../store/storeTypes'
import api from '../api/api'
import { gameUpdate } from './gameActions'

type Config = Readonly<{
  dispatch: Dispatch
  getState: () => State
}>

type PollerState = Readonly<{
  running: boolean
  timeout: number
  ticks: number
  lastTimestamp: number
}>

const initialPollerState: PollerState = {
  running: false,
  timeout: 0,
  ticks: 0,
  lastTimestamp: 0
}

let pollerState: PollerState = initialPollerState

const updatePollerState = (update: Partial<PollerState>) => {
  pollerState = {
    ...pollerState,
    ...update
  }
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
    const { setup: { credentials: { playerId } }, game: { playerView } } = config.getState()
    if (playerView) {
      const { gameId, timestamp } = playerView
      const { update } = await api.get(`poll/${gameId}/${playerId}/${timestamp}`)
      if (update) {
        config.dispatch({ type: gameUpdate, payload: update })
        updatePollerState({ ticks: 0 })
      } else if (pollerState.lastTimestamp === timestamp) {
        updatePollerState({ ticks: pollerState.ticks + 1 })
      } else {
        updatePollerState({ lastTimestamp: timestamp, ticks: 0 })
      }
    }
    pollNext()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

const pollNext = () => {
  if (pollerState.running) {
    updatePollerState({
      timeout: window.setTimeout(poll, getCurrentDelay())
    })
  }
}

const start = () => {
  if (!pollerState.running) {
    updatePollerState({ running: true })
    pollNext()
  }
}

const stop = () => {
  window.clearTimeout(pollerState.timeout)
  pollerState = initialPollerState
}

export default {
  init,
  start,
  stop
}

import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { type History } from 'history'

const isLoggerEnabled = () =>
  typeof window === 'object' && localStorage.loggerEnabled === 'true'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default (history: History) => ({
  ...(isLoggerEnabled() ? { logger } : {}),
  saga: createSagaMiddleware(),
  router: routerMiddleware(history)
})

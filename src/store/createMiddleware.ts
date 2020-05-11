import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { History } from 'history'

const isLoggerEnabled = () =>
  typeof window === 'object' && localStorage.loggerEnabled === 'true'

export default (history: History) => ({
  ...(isLoggerEnabled() ? { logger } : {}),
  saga: createSagaMiddleware(),
  router: routerMiddleware(history)
})

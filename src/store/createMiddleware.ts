import { type History } from 'history'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import createRouterMiddleware from '../router/createRouterMiddleware'

const isLoggerEnabled = () =>
  typeof window === 'object' && localStorage.loggerEnabled === 'true'

export default (history: History) => ({
  saga: createSagaMiddleware(),
  router: createRouterMiddleware(history),
  ...(isLoggerEnabled() ? { logger } : {})
})

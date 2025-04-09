import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

const isLoggerEnabled = () =>
  typeof window === 'object' && localStorage.loggerEnabled === 'true'

export default () => ({
  ...(isLoggerEnabled() ? { logger } : {}),
  saga: createSagaMiddleware()
})

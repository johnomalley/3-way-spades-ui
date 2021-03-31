import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { State } from './types'
import rootSaga from './rootSaga'
import setupReducer from '../setup/setupReducer'
import createMiddleware from './createMiddleware'
import gameListReducer from '../game-list/gameListReducer'
import gameReducer from '../game/gameReducer'
import changePoller from '../game/changePoller'

export default (history: History): Store<State> => {
  const middleware = createMiddleware(history)
  const rootReducer = combineReducers({
    setup: setupReducer,
    gameList: gameListReducer,
    game: gameReducer,
    router: connectRouter(history),
    history: () => history
  })
  const store = createStore(rootReducer, applyMiddleware(...Object.values(middleware) as any))
  changePoller.init({
    dispatch: store.dispatch,
    getState: store.getState
  })
  middleware.saga.run(rootSaga)
  return store
}

import { applyMiddleware, combineReducers, createStore, type Middleware } from 'redux'
import { connectRouter } from 'connected-react-router'
import { type History } from 'history'
import { type State } from './storeTypes'
import rootSaga from './rootSaga'
import setupReducer from '../setup/setupReducer'
import createMiddleware from './createMiddleware'
import gameListReducer from '../game-list/gameListReducer'
import gameStatsReducer from '../game-stats/gameStatsReducer'
import gameReducer from '../game/gameReducer'
import changePoller from '../game/changePoller'
import { type TypedUseSelectorHook, useSelector } from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<State> = useSelector

export default (history: History) => {
  const middleware = createMiddleware(history)

  const rootReducer = combineReducers({
    setup: setupReducer,
    gameList: gameListReducer,
    gameStats: gameStatsReducer,
    game: gameReducer,
    router: connectRouter(history),
    history: () => history
  })

  // https://stackoverflow.com/questions/71944111/redux-createstore-is-deprecated-cannot-get-state-from-getstate-in-redux-ac
  // seriously the redux team can go f*** themselves
  // assholes
  // noinspection JSDeprecatedSymbols
  const store = createStore(rootReducer, applyMiddleware(...Object.values(middleware) as Middleware[]))

  changePoller.init({
    dispatch: store.dispatch,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    getState: () => store.getState() as State
  })

  middleware.saga.run(rootSaga)

  return store
}

import { applyMiddleware, combineReducers, createStore } from 'redux'
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
import { createReduxHistoryContext } from 'redux-first-history'

export const useAppSelector: TypedUseSelectorHook<State> = useSelector

export default (history: History) => {
  const middlewareById = createMiddleware()
  const { routerMiddleware, routerReducer } = createReduxHistoryContext({ history })

  const middleware = [...Object.values(middlewareById), routerMiddleware]

  const rootReducer = combineReducers({
    setup: setupReducer,
    gameList: gameListReducer,
    gameStats: gameStatsReducer,
    game: gameReducer,
    router: routerReducer,
    history: () => history
  })

  // https://stackoverflow.com/questions/71944111/redux-createstore-is-deprecated-cannot-get-state-from-getstate-in-redux-ac
  // seriously the redux team can go f*** themselves
  // assholes
  // noinspection JSDeprecatedSymbols
  const store = createStore(rootReducer, applyMiddleware(...middleware))

  changePoller.init({
    dispatch: store.dispatch,
    getState: () => store.getState() as State
  })

  middlewareById.saga.run(rootSaga)

  return store
}

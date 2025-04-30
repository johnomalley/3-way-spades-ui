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
import routerReducer from '../router/routerReducer'
import { createSelector } from 'reselect'


export const useAppSelector: TypedUseSelectorHook<State> = useSelector

export const createAppSelector = createSelector.withTypes<State>()

export default (history: History) => {
  const middlewareById = createMiddleware(history)

  const rootReducer = combineReducers({
    setup: setupReducer,
    gameList: gameListReducer,
    gameStats: gameStatsReducer,
    game: gameReducer,
    router: routerReducer,
    history: () => history
  })

  // https://stackoverflow.com/questions/71944111/redux-createstore-is-deprecated-cannot-get-state-from-getstate-in-redux-ac
  // stupid deprecation
  // noinspection JSDeprecatedSymbols
  const store = createStore(rootReducer, applyMiddleware(...Object.values(middlewareById)))

  changePoller.init({
    dispatch: store.dispatch,
    getState: () => store.getState() as State
  })

  middlewareById.saga.run(rootSaga)

  return store
}

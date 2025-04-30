import { type History, type Update, Action as HistoryAction } from 'history'
import type { Dispatch, Middleware, Action } from 'redux'
import { type CallHistoryAction, routerCallHistory, locationChange } from './routerActions'

const createRouterMiddleware= (history: History): Middleware =>
    () =>
      (next: Dispatch) => {
        history.listen((update: Update) => {
          next(locationChange(update.location.pathname, update.action))
        })
        next(locationChange(history.location.pathname, HistoryAction.Replace))

        return (action: Action) => {
          if (action.type === routerCallHistory) {
            const { payload: { method, path } } = action as CallHistoryAction
            history[method](path)
          }
          return next(action)
        }
      }

export default createRouterMiddleware

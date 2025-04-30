import type { LocationChangePayload } from './routerActions'
import { routerLocationChange } from './routerActions'
import nullAction from '../store/nullAction'
import type { Action } from '../store/storeTypes'
import { Action as HistoryAction } from 'history'

export type RouterState = Readonly<{
  path: string
  action: HistoryAction
}>

const initialState: RouterState = { path: '/', action: HistoryAction.Push }

export default (state: RouterState = initialState, action: Action<unknown> = nullAction): RouterState => {
  if (action.type === routerLocationChange) {
    return { ...state, ...action.payload as LocationChangePayload }
  } else {
    return state
  }
}

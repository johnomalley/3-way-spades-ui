import { Action as HistoryAction } from 'history'

export const routerCallHistory = '@@router/call-history'

export const routerLocationChange = '@@router/location-change'

export type LocationChangePayload = Readonly<{
  path: string
  action: HistoryAction
}>

type CallPayload = Readonly<{ method: 'push' | 'replace' }> & LocationChangePayload

export type LocationChangeAction = Readonly<{ type: typeof routerLocationChange, payload: LocationChangePayload }>

export type CallHistoryAction = Readonly<{ type: typeof routerCallHistory, payload: CallPayload }>

export const push = (path: string): CallHistoryAction => ({
  type: routerCallHistory,
  payload: { method: 'push', path, action: HistoryAction.Push }
})

export const replace = (path: string): CallHistoryAction => ({
  type: routerCallHistory,
  payload: { method: 'replace', path, action: HistoryAction.Replace }
})

export const locationChange = (path: string, action: HistoryAction): LocationChangeAction => ({
  type: routerLocationChange,
  payload: { path, action }
})

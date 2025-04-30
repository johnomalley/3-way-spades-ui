import React from 'react'
import { useLayoutEffect, useState } from 'react'
import type { JSX } from 'react'
import type { History, Action, Location } from 'history'
import { Router } from 'react-router'

type Props = Readonly<{
  basename?: string
  children?: React.ReactNode
  history: History
}>

type RouterState = Readonly<{
  action: Action
  location: Location
}>

export default function HistoryRouter({ basename, children, history }: Props): JSX.Element {
  const [state, setState] = useState<RouterState>({
    action: history.action,
    location: history.location
  })

  useLayoutEffect(() => history.listen(setState), [history])

  return (
    <Router basename={basename} navigator={history} location={state.location} navigationType={state.action}>
      {children}
    </Router>
  )
}

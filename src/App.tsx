import React, { useEffect } from 'react'
import { type History } from 'history'
import RootRoutes from './RootRoutes'
import Navbar from './Navbar'
import { createAppSelector, useAppSelector } from './store/createStore'
import { useDispatch } from 'react-redux'
import { playersGet } from './setup/setupActions'
import HistoryRouter from './router/HistoryRouter'

export type Props = Readonly<{
  currentPath: string
  history: History
}>

const selectProps = createAppSelector(
  [_ => _.history, _ => _.setup.status],
  (history, status) => ({ history,  status })
)

export default function App () {
  const { history, status } = useAppSelector(selectProps)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'initPending') {
      dispatch({ type: playersGet })
    }
  }, [dispatch, status])

  return (
    <HistoryRouter history={history}>
      <Navbar />
      <RootRoutes />
    </HistoryRouter>
  )
}

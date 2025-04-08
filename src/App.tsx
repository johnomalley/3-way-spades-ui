import React, { useEffect } from 'react'
import { type History } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { type State } from './store/storeTypes'
import Routes from './Routes'
import Navbar from './Navbar'
import { useAppSelector } from './store/createStore'
import { useDispatch } from 'react-redux'
import { playersGet } from './setup/setupActions'

export type Props = Readonly<{
  currentPath: string
  history: History
}>

const selectProps = ({ history, setup: { status } }: State) => ({ history, status })

export default function App () {
  const { history, status } = useAppSelector(selectProps)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'initPending') {
      dispatch({ type: playersGet })
    }
  }, [dispatch, status])

  return (
    <ConnectedRouter history={history}>
      <Navbar />
      <Routes />
    </ConnectedRouter>
  )
}

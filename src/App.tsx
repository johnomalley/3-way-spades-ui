import React from 'react'
import { type History } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { type State } from './store/types'
import Routes from './Routes'
import Navbar from './Navbar'
import { useAppSelector } from './store/createStore'

export type Props = Readonly<{
  currentPath: string
  history: History
}>

const selectProps = (state: State) => ({
  history: state.history,
  currentPath: state.router.location.pathname
})

export default function App () {
  const { history, currentPath } = useAppSelector(selectProps)

  return (
    <ConnectedRouter history={history}>
      <Navbar currentPath={currentPath} />
      <div className='main-content'>
        <Routes />
      </div>
    </ConnectedRouter>
  )
}

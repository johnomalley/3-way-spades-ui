import React from 'react'
import { type History } from 'history'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { type State } from './store/types'
import Routes from './Routes'
import Navbar from './Navbar'

export type Props = Readonly<{
  currentPath: string
  history: History
}>

function App ({ history, currentPath }: Props) {
  return (
    <ConnectedRouter history={history}>
      <Navbar currentPath={currentPath} />
      <div className='main-content'>
        <Routes />
      </div>
    </ConnectedRouter>
  )
}

export const mapStateToProps = (state: State): Props => ({
  history: state.history,
  currentPath: state.router.location.pathname
})

export default connect(mapStateToProps)(App)

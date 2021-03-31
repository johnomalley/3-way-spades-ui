import * as React from 'react'
import { History } from 'history'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { State } from './store/types'
import Routes from './Routes'
import { DefaultDispatchProps } from './common/types'
import mapDispatchToProps from './common/mapDispatchToProps'
import Navbar from './Navbar'

export interface StateProps {
  currentPath: string
  history: History
}

type Props = StateProps & DefaultDispatchProps

export class App extends React.PureComponent<Props> {
  render () {
    const { history } = this.props
    return (
      <ConnectedRouter history={history}>
        <Navbar currentPath={this.props.currentPath} dispatch={this.props.dispatch} push={this.props.push} />
        <div className='main-content'>
          <Routes />
        </div>
      </ConnectedRouter>
    )
  }
}

export const mapStateToProps = (state: State): StateProps => ({
  history: state.history,
  currentPath: state.router.location.pathname
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

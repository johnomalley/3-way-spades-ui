import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SetupViewContainer from './setup/SetupViewContainer'
import GameListViewContainer from './game-list/GameListViewContainer'
import GameContainer from './game/GameContainer'

export default class Routes extends React.Component<{}> {
  render () {
    return (
      <Switch>
        <Route path='/setup' component={SetupViewContainer}/>
        <Route path='/games/:id' component={GameContainer}/>
        <Route path='/games' component={GameListViewContainer}/>
        <Redirect to='/games'/>
      </Switch>
    )
  }
}

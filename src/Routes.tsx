import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SetupViewContainer from './setup/SetupViewContainer'
import GameListViewContainer from './game-list/GameListViewContainer'
import GameContainer from './game/GameContainer'

type Props = Readonly<{}>

export default function Routes (_: Props) {
  return (
    <Switch>
      <Route path='/setup' component={SetupViewContainer} />
      <Route path='/games/:id' component={GameContainer} />
      <Route path='/games' component={GameListViewContainer} />
      <Redirect to='/games' />
    </Switch>
  )
}

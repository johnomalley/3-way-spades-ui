import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SetupPage from './setup/SetupPage'
import HomePage from './HomePage'
import GamePage from './game/GamePage'

export default function Routes () {
  return (
    <Switch>
      <Route path='/setup' component={SetupPage} />
      <Route path='/games/:id' component={GamePage} />
      <Route path='/games' component={HomePage} />
      <Redirect to='/games' />
    </Switch>
  )
}

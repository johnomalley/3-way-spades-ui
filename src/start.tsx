import { Renderer } from 'react-dom'
import { Provider } from 'react-redux'
import { History } from 'history'
import * as React from 'react'
import createStore from './store/createStore'
import AppContainer from './AppContainer'

interface Args {
  element: HTMLElement
  render: Renderer
  history: History
}

export default ({ element, render, history }: Args) => {
  const store = createStore(history)

  store.dispatch({ type: 'credentials/init' })

  const rootContent = (
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  )

  render(rootContent, element)
}

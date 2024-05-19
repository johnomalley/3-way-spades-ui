import { type Renderer } from 'react-dom'
import { Provider } from 'react-redux'
import { type History } from 'history'
import React from 'react'
import createStore from './store/createStore'
import App from './App'

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
      <App />
    </Provider>
  )

  render(rootContent, element)
}

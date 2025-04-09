import { Provider } from 'react-redux'
import { type History } from 'history'
import React from 'react'
import createStore from './store/createStore'
import App from './App'
import { credentialsInit } from './setup/setupActions'

type SimpleRenderer = (element: React.JSX.Element) => void

type Args = Readonly<{
  render: SimpleRenderer
  history: History
}>

export default ({ render, history }: Args) => {
  const store = createStore(history)

  store.dispatch({ type: credentialsInit })

  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

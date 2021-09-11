import '@fortawesome/fontawesome-free/css/all.css'
import './index.scss'
import { render } from 'react-dom'
import { createHashHistory } from 'history'
import start from './start'

start({
  element: document.getElementById('main')!,
  render,
  history: createHashHistory()
})

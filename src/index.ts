import '@fortawesome/fontawesome-free/css/all.css'
import './index.scss'
import { createRoot } from 'react-dom/client'
import { createHashHistory } from 'history'
import start from './start'

const render = (content: React.JSX.Element) => {
  const element = document.getElementById('main')
  if (element) {
    createRoot(element).render(content)
  } else {
    throw new Error('DOM element with id \'main\' was not found.')
  }
}

const history = createHashHistory()

start({ render, history })

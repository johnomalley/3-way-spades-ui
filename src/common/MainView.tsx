import * as React from 'react'
import ErrorOverlay from './ErrorOverlay'

type Props = Readonly<{
  title: string
  error?: Error | string
  children?: React.ReactNode
}>

export default class MainView extends React.PureComponent<Props> {
  render (): React.ReactNode {
    const { title, error, children } = this.props
    return (
      <div className='columns'>
        <div className='column is-half'>
          <h4>{title}</h4>
          {
            error ? <ErrorOverlay error={error} /> : children
          }
        </div>
      </div>
    )
  }
}

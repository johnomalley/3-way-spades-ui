import * as React from 'react'

type Props = Readonly<{
  error: Error | string
}>

export default class ErrorOverlay extends React.PureComponent<Props> {
  render (): React.ReactNode {
    const error = this.props.error as any
    const message = error.message || error
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
}

import * as React from 'react'
import classNames = require('classnames')

type Props = Readonly<{
  className?: string
}>

export default class WaitSpinner extends React.PureComponent<Props> {
  render (): React.ReactNode {
    return (
      <div className={classNames('wait-spinner', this.props.className)}>
        <i className='fas fa-spinner fa-pulse'/>
      </div>
    )
  }
}

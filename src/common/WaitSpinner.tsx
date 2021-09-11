import React from 'react'
import classNames from 'classnames'

type Props = Readonly<{
  className?: string
}>

export default function WaitSpinner ({ className }: Props) {
  return (
    <div className={classNames('wait-spinner', className)}>
      <i className='fas fa-spinner fa-pulse' />
    </div>
  )
}

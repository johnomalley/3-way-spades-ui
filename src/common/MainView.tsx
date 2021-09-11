import React from 'react'
import ErrorOverlay from './ErrorOverlay'

type Props = Readonly<{
  title: string
  error?: Error | string
  children?: React.ReactNode
}>

export default function MainView ({ title, error, children }: Props) {
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

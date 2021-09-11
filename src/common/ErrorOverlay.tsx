import React from 'react'

type Props = Readonly<{
  error: Error | string
}>

export default function ErrorOverlay ({ error }: Props) {
  const message = typeof error === 'string' ? error : error.message
  return (
    <div className='error'>
      {message}
    </div>
  )
}

import React, { type ChangeEvent } from 'react'

type Props = Readonly<{
  apiKey?: string
  playerId?: string
  onChange: (property: string, value: string) => void
}>

export default function SetupForm ({ apiKey, playerId, onChange }: Props) {
  const onApiKeyChanged = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('apiKey', event.target.value)
  }

  const onPlayerIdChanged = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('playerId', event.target.value.toLowerCase())
  }

  return (
    <div className='card'>
      <div className='card-header'>
        <div className='card-header-title'>Setup</div>
        <div className='card-header-icon'><i className='fas fa-cog' /></div>
      </div>
      <div className='card-content'>
        <div className='field'>
          <label className='label'>API Key</label>
          <div className='control'>
            <input
              className='input'
              autoCorrect='off'
              autoComplete='off'
              type='text'
              value={apiKey ?? ''}
              onChange={onApiKeyChanged}
            />
          </div>
        </div>
        <div className='field mt-4'>
          <label className='label'>Player ID</label>
          <div className='control'>
            <input
              className='input'
              type='text'
              autoCorrect='off'
              autoComplete='off'
              value={playerId ?? ''}
              onChange={onPlayerIdChanged}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

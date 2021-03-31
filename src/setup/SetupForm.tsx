import * as React from 'react'
import { ChangeEvent } from 'react'

type Props = Readonly<{
  apiKey?: string
  playerId?: string
  onChange: (property: string, value: string) => void
}>

export default class SetupForm extends React.PureComponent<Props> {
  onApiKeyChanged = (event: ChangeEvent<HTMLInputElement>) =>
    this.props.onChange('apiKey', event.target.value)

  onPlayerIdChanged = (event: ChangeEvent<HTMLInputElement>) =>
    this.props.onChange('playerId', event.target.value)

  render (): React.ReactNode {
    const { apiKey, playerId } = this.props
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
                type='text'
                value={apiKey || ''}
                onChange={this.onApiKeyChanged}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Player ID</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                value={playerId || ''}
                onChange={this.onPlayerIdChanged}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

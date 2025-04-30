import React, { useCallback, useEffect } from 'react'
import { createAppSelector, useAppSelector } from '../store/createStore'
import { useDispatch } from 'react-redux'
import { credentialsCancelEdit, credentialsSave, credentialsUpdate } from './setupActions'
import { isEqual } from 'lodash'
import classNames from 'classnames'

const selectProps = createAppSelector(
  [
    _ => _.setup.credentials,
    _ => _.setup.editedCredentials,
    _ => _.setup.validationMessages,
    _ => _.setup.status
  ],
  (credentials, editedCredentials, validationMessages, status) => ({
    credentials,
    editedCredentials,
    validationMessages,
    status
  })
)

type HelpTextProps = Readonly<{ message?: string }>

function HelpText ({ message }: HelpTextProps) {
  return (
    <p className={classNames('help is-danger', { 'is-invisible': !message })}>
      {message ?? '(none)'}
    </p>
  )
}

export default function SetupForm () {
  const dispatch = useDispatch()

  const { credentials, editedCredentials, validationMessages, status } = useAppSelector(selectProps)

  const onChange = useCallback((field: 'apiKey' | 'playerId', rawValue: string) => {
    let value = rawValue.trim()
    if (field === 'playerId') {
      value = value.toLowerCase()
    }
    dispatch({ type: credentialsUpdate, payload: { ...editedCredentials, [field]: value } })
  }, [dispatch, editedCredentials])

  const onSave = useCallback(() => {
    dispatch({ type: credentialsSave })
  }, [dispatch])

  const onCancel = useCallback(() => {
    dispatch({ type: credentialsCancelEdit })
  }, [dispatch])

  useEffect(() => onCancel, [onCancel])

  const isChanged = !isEqual(credentials, editedCredentials)

  const submitEnabled = isChanged && status === 'valid'

  return (
    <div className='card'>
      <div className='card-content'>
        <div className='field'>
          <label className='label'>API Key</label>
          <div className='control'>
            <input
              className='input'
              autoCapitalize='off'
              autoCorrect='off'
              autoComplete='off'
              type='text'
              readOnly={status === 'initPending'}
              value={editedCredentials.apiKey}
              onChange={e => onChange('apiKey', e.target.value)}
            />
          </div>
          <HelpText message={validationMessages.apiKey} />
        </div>
        <div className='field mt-2'>
          <label className='label'>Player ID</label>
          <div className='control'>
            <input
              className='input'
              autoCapitalize='off'
              autoCorrect='off'
              autoComplete='off'
              type='text'
              readOnly={status === 'initPending'}
              value={editedCredentials.playerId}
              onChange={e => onChange('playerId', e.target.value)}
            />
          </div>
          <HelpText message={validationMessages.playerId} />
        </div>
        <div className='field is-grouped mt-2'>
          <div className='control'>
            <button
              disabled={!submitEnabled}
              className='button is-primary mr-2'
              onClick={onSave}
            >
              Save
            </button>
            <button
              disabled={!isChanged}
              className='button'
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

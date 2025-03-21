import React from 'react'
import SetupForm from './SetupForm'
import { credentialsSave } from './setupActions'
import getCredentials from './getCredentials'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../store/createStore'

export default function SetupPage () {
  const { apiKey, playerId } = useAppSelector(getCredentials)
  const dispatch = useDispatch()

  const onFormFieldChange = (propertyName: string, value: string) =>
    dispatch({ type: credentialsSave, payload: { [propertyName]: value } })

  return (
    <div className='columns p-4 setup-page'>
      <div className='column is-half'>
        <SetupForm onChange={onFormFieldChange} {...{ apiKey, playerId }} />
      </div>
    </div>
  )
}

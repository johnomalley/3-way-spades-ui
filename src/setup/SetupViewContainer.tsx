import React from 'react'
import { DefaultDispatchProps } from '../common/types'
import SetupForm from './SetupForm'
import { credentialsSave } from './actions'
import { Credentials } from './setupReducer'
import mapDispatchToProps from '../common/mapDispatchToProps'
import getCredentials from './getCredentials'
import { connect } from 'react-redux'

type StateProps = Credentials

type Props = StateProps & DefaultDispatchProps

function SetupView ({ apiKey, playerId, dispatch }: Props) {
  const onFormFieldChange = (propertyName: string, value: string) =>
    dispatch({ type: credentialsSave, payload: { [propertyName]: value } })

  return (
    <div className='columns'>
      <div className='column is-half'>
        <SetupForm onChange={onFormFieldChange} {...{ apiKey, playerId }} />
      </div>
    </div>
  )
}

export default connect(getCredentials, mapDispatchToProps)(SetupView)

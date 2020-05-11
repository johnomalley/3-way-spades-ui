import * as React from 'react'
import { DefaultDispatchProps } from '../common/types'
import SetupForm from './SetupForm'
import { credentialsSave } from './actions'
import { Credentials } from './setupReducer'
import mapDispatchToProps from '../common/mapDispatchToProps'
import getCredentials from './getCredentials'
import { connect } from 'react-redux'

type StateProps = Credentials

type Props = StateProps & DefaultDispatchProps

class SetupView extends React.PureComponent<Props> {
  onFormFieldChange = (propertyName: string, value: string) =>
    this.props.dispatch({ type: credentialsSave, payload: { [propertyName]: value } })

  render (): React.ReactNode {
    const { apiKey, playerId } = this.props
    return (
      <div className='columns'>
        <div className='column is-half'>
          <SetupForm onChange={this.onFormFieldChange} {...{ apiKey, playerId }}/>
        </div>
      </div>
    )
  }
}

export default connect(getCredentials, mapDispatchToProps)(SetupView)

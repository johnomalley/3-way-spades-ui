import nullAction from '../store/nullAction'
import { Action } from '../store/types'
import { credentialsUpdate, setupActions } from './actions'

export type SetupActionType = typeof setupActions[number]

export type Credentials = Readonly<{
  apiKey?: string
  playerId?: string
}>

export type SetupState = Credentials & Readonly<{
  credentialsValid: boolean
}>

const initialState: SetupState = {
  credentialsValid: false
}

const validateCredentials = (state: SetupState): SetupState => ({
  ...state,
  credentialsValid: Boolean(state.apiKey) && Boolean(state.playerId)
})

export default (state: SetupState = initialState, action: Action = nullAction): SetupState => {
  switch (action.type) {
    case credentialsUpdate:
      return validateCredentials({
        ...state,
        ...action.payload
      })
    default:
      return state
  }
}

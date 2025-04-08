import nullAction from '../store/nullAction'
import { type Action } from '../store/storeTypes'
import { credentialsUpdate, playersUpdate, type setupActions, credentialsSave, playersError, credentialsCancelEdit } from './setupActions'
import { isEmpty } from 'lodash'

export type SetupActionType = typeof setupActions[number]

export type Player = Readonly<{
  id: string
  displayName: string
  admin: boolean
}>

export type Credentials = Readonly<{
  apiKey: string
  playerId: string
}>

const emptyCredentials: Credentials = { apiKey: '', playerId: '' }

const minApiKeyLength = 40

export type ValidationMessages = Readonly<Partial<Record<keyof Credentials, string>>>

const initialValidationMessages: ValidationMessages = {
  apiKey: 'API key is required',
  playerId: 'Player ID is required'
}

export type SetupStatus = 'invalid' | 'valid' | 'initPending' | 'initialized'

export type PlayersById = Readonly<Record<string, Player>>

export type SetupState = Readonly<{
  credentials: Credentials
  editedCredentials: Credentials
  validationMessages: ValidationMessages
  status: SetupStatus
  players: PlayersById
}>

const initialState: SetupState = {
  credentials: emptyCredentials,
  editedCredentials: emptyCredentials,
  status: 'invalid',
  validationMessages: initialValidationMessages,
  players: {}
}

const validatePlayerId = (playerId: string): Partial<ValidationMessages> =>
  playerId.length === 0 ? { playerId: 'Player ID is required' } : {}

const validateApiKey = (apiKey: string): Partial<ValidationMessages> => {
  if (apiKey.length === 0) {
    return { apiKey: 'API key is required' }
  } else if (apiKey.length < minApiKeyLength) {
    return { apiKey: 'API key format is invalid' }
  } else {
    return {}
  }
}

const validateCredentials = (state: SetupState): SetupState => {
  const { editedCredentials } = state
  const apiKey = editedCredentials.apiKey.trim()
  const playerId = editedCredentials.playerId.trim().toLowerCase()
  const validationMessages: ValidationMessages = { ...validateApiKey(apiKey), ...validatePlayerId(playerId) }
  return {
    ...state,
    editedCredentials: { apiKey, playerId },
    validationMessages,
    status: isEmpty(validationMessages) ? 'valid' : 'invalid'
  }
}

const validatePlayerExists = (state: SetupState): SetupState => {
  const { playerId } = state.credentials
  if (state.players[playerId]) {
    return { ...state, validationMessages: {}, status: 'initialized' }
  } else {
    return {
      ...state,
      validationMessages: {
        playerId: `Player '${playerId}' was not found`
      },
      status: 'invalid'
    }
  }
}

const getPlayersById = (players: readonly Player[]): PlayersById => {
  const result: Record<string, Player> = {}
  players.forEach(p => {
    result[p.id] = p
  })
  return result
}

const cancelEdit = (state: SetupState): SetupState => {
  if (state.status === 'invalid') {
    return state
  } else {
    return {
      ...state,
      status: isEmpty(state.players) ? 'initPending' : 'initialized'
    }
  }
}

export default (state: SetupState = initialState, action: Action<unknown> = nullAction): SetupState => {
  switch (action.type) {
    case credentialsUpdate:
      return validateCredentials({
        ...state,
        editedCredentials: {
          ...state.editedCredentials,
          ...action.payload as Partial<Credentials>
        }
      })
    case credentialsSave:
      return { ...state, credentials: state.editedCredentials, status: 'initPending', players: {} }
    case credentialsCancelEdit:
      return cancelEdit(validateCredentials({ ...state, editedCredentials: state.credentials }))
    case playersUpdate:
      return validatePlayerExists({
        ...state,
        players: getPlayersById(action.payload as Player[])
      })
    case playersError:
      return {
        ...state,
        status: 'invalid',
        validationMessages: {
          playerId: `Failed to get players: ${(action.payload as Error).message}`
        }
      }
    default:
      return state
  }
}

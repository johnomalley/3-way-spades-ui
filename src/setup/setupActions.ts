export const credentialsInit = 'credentials/init'

export const credentialsUpdate = 'credentials/update'

export const credentialsSave = 'credentials/save'

export const credentialsCancelEdit = 'credentials/cancel-edit'

export const playersGet = 'players/get'

export const playersUpdate = 'players/update'

export const playersError = 'players/error'

export const setupActions: readonly string[] = [
  credentialsInit,
  credentialsUpdate,
  credentialsSave,
  credentialsCancelEdit,
  playersGet,
  playersUpdate,
  playersError
] as const

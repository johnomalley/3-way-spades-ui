export const gameListGet = 'game-list/get'

export const gameListUpdate = 'game-list/update'

export const gameListError = 'game-list/error'

export const gameListNew = 'game-list/new'

export const gameListActions: readonly string[] = [
  gameListGet,
  gameListUpdate,
  gameListError,
  gameListNew
] as const

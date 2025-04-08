export const gameListGet = 'game-list/get'

export const gameListUpdate = 'game-list/update'

export const gameListError = 'game-list/error'

export const gameListNew = 'game-list/new'

export const gameListDelete = 'game-list/delete'

export const gameListConfirmDelete = 'game-list/confirm-delete'

export const gameListClearDeletedGame = 'game-list/clear-deleted'

export const gameListActions: readonly string[] = [
  gameListGet,
  gameListUpdate,
  gameListError,
  gameListNew,
  gameListDelete,
  gameListConfirmDelete,
  gameListClearDeletedGame
] as const

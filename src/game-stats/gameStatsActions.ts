export const gameStatsGet = 'game-stats/get'

export const gameStatsUpdate = 'game-stats/update'

export const gameStatsError = 'game-stats/error'

export const gameStatsActions: readonly string[] = [
  gameStatsGet,
  gameStatsUpdate,
  gameStatsError
] as const

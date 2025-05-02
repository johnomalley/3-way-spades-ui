import type { GameStatsSummary } from './gameStatsReducer'
import type { PlayersById } from '../setup/setupReducer'
import sortBy from 'lodash/sortBy'

export type PlayerRank = Readonly<{
  id: string,
  displayName: string,
  wins: number,
  rank: number
}>

const getPlayerRanks = ({ winCounts }: GameStatsSummary, players: PlayersById): readonly PlayerRank[] => {
  const wins: PlayerRank[] = Object.keys(winCounts).map((id =>
    ({ id, displayName: players[id].displayName, wins: winCounts[id], rank: 1 }))
  )
  const results = sortBy(wins, _ => -1 * _.wins)
  for (let i = 1; i < results.length; i++) {
    const result = results[i]
    if (result.wins < results[i - 1].wins) {
      // if not tied with the previous player then the rank is always i + 1
      // e.g. 1, 1, 3; 1, 2, 2; or 1, 2, 3
      results[i] = { ...result, rank: i + 1 }
    } else {
      // if tied the rank is always the same as the previous player
      results[i] = { ...result, rank: results[i - 1].rank }
    }
  }
  return results
}

export default getPlayerRanks

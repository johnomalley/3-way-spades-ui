import { type GameStatsSummary } from './gameStatsReducer'
import React, { useMemo } from 'react'
import upCase from '../common/upCase'
import sortBy from 'lodash/sortBy'

type Props = Readonly<{
  summary: GameStatsSummary
}>

type PlayerWins = Readonly<{ name: string, wins: number, rank: number }>

const getPlayerWins = ({ winCounts }: GameStatsSummary): readonly PlayerWins[] => {
  const wins: PlayerWins[] = Object.keys(winCounts).map((id => ({ name: upCase(id), wins: winCounts[id], rank: 1 })))
  const results = sortBy(wins, _ => -1 * _.wins)
  for (let i = 1; i < results.length; i++) {
    const result = results[i]
    if (result.wins < results[i - 1].wins) {
      // if not tied with the previous player then the rank is always i + 1
      // e.g. 1, 1, 3; 1, 2, 2; or 1, 2, 3
      results[i] = { ...result, rank: i + 1 }
    } else if (result.rank !== results[i - 1].rank) {
      // if tied the rank is always the same as the previous player
      results[i] = { ...result, rank: results[i - 1].rank }
    }
  }
  return results
}

export default function LeaderBoard ({ summary }: Props) {
  const playerWins = useMemo(() => getPlayerWins(summary), [summary])

  return (
    <article className='message is-info leader-board'>
      <div className='message-header'>
        Leader Board ({summary.gameCount} games)
      </div>
      <div className='message-body'>
        {
          playerWins.map(({ name, wins, rank }) => <
            div key={name} className={`player-${rank}`}>{name} {wins}</div>
          )
        }
      </div>
    </article>
  )
}

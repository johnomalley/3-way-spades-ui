import { type GameStatsSummary } from './gameStatsReducer'
import React, { useMemo } from 'react'
import sortBy from 'lodash/sortBy'
import { type PlayersById } from '../setup/setupReducer'
import classNames from 'classnames'
import { useAppSelector } from '../store/createStore'
import selectPlayer from '../setup/selectPlayer'

type Props = Readonly<{
  summary: GameStatsSummary
  players: PlayersById
}>

type PlayerWins = Readonly<{ id: string, displayName: string, wins: number, rank: number }>

const getPlayerWins = ({ winCounts }: GameStatsSummary, players: PlayersById): readonly PlayerWins[] => {
  const wins: PlayerWins[] = Object.keys(winCounts).map((id =>
    ({ id, displayName: players[id].displayName, wins: winCounts[id], rank: 1 }))
  )
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

export default function LeaderBoard ({ summary, players }: Props) {
  const currentPlayer = useAppSelector(selectPlayer)

  const playerWins = useMemo(
    () => getPlayerWins(summary, players),
    [summary, players]
  )

  return (
    <article className='message is-info leader-board'>
      <div className='message-header'>
        Leader Board ({summary.gameCount} games)
      </div>
      <div className='message-body'>
        {
          playerWins.map(({ id, displayName, wins, rank }) => <
            div key={id} className={classNames(`player-${rank}`, { 'has-text-weight-bold has-text-success': id === currentPlayer.id })}>
              {displayName} {wins}
            </div>
          )
        }
      </div>
    </article>
  )
}

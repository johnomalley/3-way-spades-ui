import React from 'react'
import { type GameStatsSummary } from './gameStatsReducer'
import RecentGameRow from './RecentGameRow'
import { useAppSelector } from '../store/createStore'
import selectPlayer from '../setup/selectPlayer'
import { type PlayersById } from '../setup/setupReducer'

type Props = Readonly<{
  summary: GameStatsSummary
  players: PlayersById
}>

export default function RecentGames ({ summary, players }: Props) {
  const currentPlayer = useAppSelector(selectPlayer)

  return (
    <div className='recent-games p-2 mt-2'>
      <table className='table'>
        <thead>
          <tr className='recent-games-header-row'>
            <td className='is-info has-text-black'>Date</td>
            <td className='is-info has-text-black'>Winner</td>
          </tr>
        </thead>
        <tbody>
        {
          summary.recentGames.map((stats, i) =>
            <RecentGameRow
              key={stats.endTime}
              stats={stats}
              currentPlayer={currentPlayer}
              players={players}
              index={i}
            />
          )
        }
        </tbody>
      </table>
    </div>
  )
}

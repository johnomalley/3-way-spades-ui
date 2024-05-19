import React from 'react'
import { type GameStatsSummary } from './gameStatsReducer'
import RecentGameRow from './RecentGameRow'

type Props = Readonly<{
  summary: GameStatsSummary
}>

export default function RecentGames ({ summary }: Props) {
  return (
    <div className='recent-games p-2 mt-2'>
      <table className='table'>
        <thead>
          <tr>
            <td>Date</td>
            <td>Winner(s)</td>
          </tr>
        </thead>
        <tbody>
        {
          summary.recentGames.map((stats, i) =>
            <RecentGameRow key={stats.endTime} stats={stats} index={i}/>
          )
        }
        </tbody>
      </table>
    </div>
  )
}

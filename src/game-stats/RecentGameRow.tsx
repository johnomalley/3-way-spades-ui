import React from 'react'
import { DateTime } from 'luxon'
import { type GameStats } from './gameStatsReducer'
import upCase from '../common/upCase'

type Props = Readonly<{
  stats: GameStats
  index: number
}>

const getDateString = (date: string): string => DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)

const getStartAndEndDateString = (stats: GameStats) => {
  const start = getDateString(stats.startTime)
  const end = getDateString(stats.endTime)
  if (start === end) {
    return end
  } else {
    return `${start} - ${end}`
  }
}

export default function RecentGameRow ({ stats, index }: Props) {
  return (
    <tr className={index % 2 === 0 ? 'shaded' : undefined}>
      <td>
        {getStartAndEndDateString(stats)}
      </td>
      <td>
        {stats.winners.map(upCase).join(' & ')}
      </td>
    </tr>
  )
}

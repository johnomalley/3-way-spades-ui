import React from 'react'
import { DateTime } from 'luxon'
import { type GameStats } from './gameStatsReducer'
import { type Player, type PlayersById } from '../setup/setupReducer'
import classNames from 'classnames'

type Props = Readonly<{
  stats: GameStats
  index: number
  currentPlayer: Player
  players: PlayersById
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

export default function RecentGameRow ({ stats, index, currentPlayer, players }: Props) {
  return (
    <tr className={index % 2 === 0 ? 'shaded' : undefined}>
      <td>
        {getStartAndEndDateString(stats)}
      </td>
      <td className={classNames({ 'has-text-weight-bold has-text-success': stats.winners.some(_ => currentPlayer.id === _) })}>
        {stats.winners.map(id => players[id].displayName).join(' & ')}
      </td>
    </tr>
  )
}

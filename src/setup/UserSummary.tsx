import type { GameStatsSummary } from '../game-stats/gameStatsReducer'
import type { ReactNode } from 'react'
import React, { useMemo } from 'react'
import type { Player, PlayersById } from './setupReducer'
import getPlayerRanks from '../game-stats/getPlayerRanks'
import { DateTime } from 'luxon'

type Props = Readonly<{
  player: Player
  players: PlayersById
  summary: GameStatsSummary
}>

type HeaderColumnProps = Readonly<{
  children: ReactNode
}>


function HeaderColumn ({ children }: HeaderColumnProps) {
  return (
    <td className='has-text-weight-bold has-text-info'>{children}</td>
  )
}

const getRankText = (rank: number | undefined) => {
  if (rank) {
    switch (rank % 10) {
      case 1: return `${rank}st`
      case 2: return `${rank}nd`
      case 3: return `${rank}rd`
      default: return `${rank}th`
    }
  } else {
    return 'N/A'
  }
}

export default function UserSummary ({ player, players, summary }: Props) {

  const playerRanks = useMemo(
    () => getPlayerRanks(summary, players),
    [summary, players]
  )

  const playerRank = useMemo(
    () => playerRanks.find(_ => _.id === player.id),
    [playerRanks, player]
  )

  const mostRecentWin = useMemo(
    () => summary.recentGames.find(_ => _.winners.includes(player.id)),
    [summary.recentGames, player]
  )

  const rankText = useMemo(() => getRankText(playerRank?.rank), [playerRank])

  const tied = playerRanks.some(_ => _.id !== player.id && _.rank === playerRank?.rank)

  return (
    <table className='table'>
      <tbody>
      <tr>
        <HeaderColumn>Wins:</HeaderColumn>
        <td>
          {summary.winCounts[player.id] ?? 0}
          {' / '}
          {summary.gameCount}
          {' - '}
          {rankText}
          {tied && ' (tie)'}
        </td>
      </tr>
      <tr>
        <HeaderColumn>Most recent win:</HeaderColumn>
        <td>{mostRecentWin ? DateTime.fromISO(mostRecentWin.endTime).toLocaleString(DateTime.DATE_SHORT) : '(none)'}</td>
      </tr>
      </tbody>
    </table>
  )
}

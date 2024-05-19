import { type GameStatsSummary } from './gameStatsReducer'
import React from 'react'
import upCase from '../common/upCase'
import sortBy from 'lodash/sortBy'

type Props = Readonly<{
  summary: GameStatsSummary
}>

type PlayerWins = Readonly<{ name: string, wins: number }>

const getPlayerWins = ({ winCounts }: GameStatsSummary): readonly PlayerWins[] => {
  const wins: PlayerWins[] = Object.keys(winCounts).map(id => ({ name: upCase(id), wins: winCounts[id] }))
  return sortBy(wins, _ => -1 * _.wins)
}

export default function LeaderBoard ({ summary }: Props) {
  return (
    <article className='message is-info leader-board'>
      <div className='message-header'>
        Leader Board ({summary.gameCount} games)
      </div>
      <div className='message-body'>
        {
          getPlayerWins(summary).map(({ name, wins }, i) => <
            div className={`player-${i + 1}`}>{name} {wins}</div>
          )
        }
      </div>
    </article>
  )
}

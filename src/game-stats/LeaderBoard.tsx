import { type GameStatsSummary } from './gameStatsReducer'
import React, { useMemo } from 'react'
import { type PlayersById } from '../setup/setupReducer'
import classNames from 'classnames'
import { useAppSelector } from '../store/createStore'
import selectPlayer from '../setup/selectPlayer'
import getPlayerRanks from './getPlayerRanks'

type Props = Readonly<{
  summary: GameStatsSummary
  players: PlayersById
}>

export default function LeaderBoard ({ summary, players }: Props) {
  const currentPlayer = useAppSelector(selectPlayer)

  const playerRanks = useMemo(
    () => getPlayerRanks(summary, players),
    [summary, players]
  )

  return (
    <article className='message is-info leader-board'>
      <div className='message-header'>
        Leader Board ({summary.gameCount} games)
      </div>
      <div className='message-body'>
        {
          playerRanks.map(({ id, displayName, wins, rank }) => <
            div key={id} className={classNames(`player-${rank}`, { 'has-text-weight-bold has-text-success': id === currentPlayer.id })}>
              {displayName} {wins}
            </div>
          )
        }
      </div>
    </article>
  )
}

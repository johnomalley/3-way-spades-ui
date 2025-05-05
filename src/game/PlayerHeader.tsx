import React from 'react'
import { HandPhase, type PlayerView } from './gameReducer'
import bidString from './bidString'
import WaitSpinner from '../common/WaitSpinner'
import last from 'lodash/last'
import classNames from 'classnames'
import { useAppSelector } from '../store/createStore'
import selectPlayersById from '../setup/selectPlayersById'

type Props = Readonly<{
  playerView: PlayerView
  playerNumber: number
  active: boolean
  busy?: boolean
}>

export default function PlayerHeader ({ playerView, playerNumber, active, busy }: Props) {
  const playersById = useAppSelector(selectPlayersById)
  const player = playerView.players[playerNumber]
  const playerName = playersById[player.id].displayName
  const { phase, tricks } = playerView
  const lastTrick = last(tricks)
  const remainingTrickCount = 17 - tricks.length + (!lastTrick || lastTrick.cards.length === 3 ? 0 : 1)
  const { trickCount } = player

  const getNilTrickCountModifier = () => {
    if (trickCount > 0) {
      return 'set'
    } else if (remainingTrickCount === 0) {
      return 'made'
    } else {
      return 'pending'
    }
  }

  const getNonNilTrickCountModifier = (bid: number) => {
    if (bid <= trickCount) {
      return 'made'
    } else if (trickCount + remainingTrickCount < bid) {
      return 'set'
    } else {
      return 'pending'
    }
  }

  const getTrickCountModifier = () => {
    if (tricks.length === 0) {
      return 'pending'
    } else {
      const bid = player.bid!
      return bid === 0 ? getNilTrickCountModifier() : getNonNilTrickCountModifier(bid)
    }
  }

  const headerClass = classNames('card-header', 'player-summary', { active })

  return (
    <div className={headerClass}>
      <div className='card-header-title level'>
        <div className='level-left'>
          <div className='level-item player-name'>
            {playerName}
          </div>
          <div className='level-item points'>{String(player.points)}</div>
          {
            player.bid === undefined
              ? undefined
              : <div className='level-item bid'>{bidString(player.bid)}</div>

          }
          {
            phase === HandPhase.Bidding
              ? undefined
              : <div className={classNames('level-item', 'trick-count', getTrickCountModifier())}>
                  {player.trickCount}
                </div>

          }
        </div>
        {
          busy
            ? <div className='level-right'>
                <WaitSpinner className='level-item' />
              </div>
            : undefined
        }
      </div>
    </div>
  )
}

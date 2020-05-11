import last = require('lodash/last')
import * as React from 'react'
import { HandPhase, PlayerView } from './gameReducer'
import bidString from './bidString'
import classNames = require('classnames')
import WaitSpinner from '../common/WaitSpinner'

type Props = Readonly<{
  playerView: PlayerView
  busy?: boolean
  playerNumber: number
}>


export default class PlayerHeader extends React.PureComponent<Props> {
  render (): React.ReactNode {
    const { playerView, busy, playerNumber } = this.props
    const player = playerView.players[playerNumber]
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

    const headerClass = classNames(
      'card-header',
      'player-summary',
      { active: playerView.currentPlayerNumber === playerNumber}
    )

    return (
      <div className={headerClass}>
        <div className='card-header-title level'>
          <div className='level-left'>
            {player.name}
            {
              player.points === 0 ? undefined : (
                <div className='level-item points'>{String(player.points)}</div>
              )
            }
            {
              player.bid === undefined ? undefined : (
                <div className='level-item bid'>{bidString(player.bid)}</div>
              )
            }
            {
              phase === HandPhase.Bidding ? undefined : (
                <div className={classNames('level-item', 'trick-count', getTrickCountModifier())}>
                  {player.trickCount}
                </div>
              )
            }
          </div>
            {
              busy ? (
                <div className='level-right'>
                  <WaitSpinner className='level-item'/>
                </div>
              ) : undefined
            }
        </div>
      </div>
    )
  }
}

import React from 'react'
import classNames from 'classnames'
import { type Card as CardType } from './gameReducer'
import Card from './Card'

type Props = Readonly<{
  lead: boolean
  winner: boolean
  side?: 'left' | 'right'
  playerName?: string
  card?: CardType
}>

export default function PlayAreaCard ({ lead, side, playerName, card, winner }: Props) {
  const playerNameNode = playerName ? <div className='player-name'>{playerName}</div> : undefined
  const cardNode = card ? <Card card={card} winner={winner} /> : <div className='playing-card' />

  return (
    <div className={classNames('level-item', 'play-area-card', { lead })}>
      {
        side === 'left' ? cardNode : playerNameNode
      }
      {
        side === 'left' ? playerNameNode : cardNode
      }
    </div>
  )
}

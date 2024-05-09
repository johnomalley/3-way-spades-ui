import React from 'react'
import classNames from 'classnames'
import { type Card as CardType } from './gameReducer'
import Card from './Card'

type Props = Readonly<{
  lead: boolean
  side?: 'left' | 'right'
  playerName?: string
  card?: CardType
}>

export default function PlayAreaCard ({ lead, side, playerName, card }: Props) {
  const playerNameNode = playerName ? <div className='player-name'>{playerName}</div> : undefined
  const cardNode = card ? <Card card={card} /> : <div className='playing-card' />

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

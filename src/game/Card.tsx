import React from 'react'
import { type Card as CardType } from './gameReducer'
import SuitSymbol from '../common/SuitSymbol'
import classNames from 'classnames'

type Props = Readonly<{
  card: CardType
  unplayable?: boolean
  className?: string
  selected?: boolean
  onClick?: (card: CardType, clickCount: number) => void
  playerInitial?: string
  winner?: boolean
}>

const rankSymbol = (rank: number): string => {
  switch (rank) {
    case 14:
      return 'A'
    case 13:
      return 'K'
    case 12:
      return 'Q'
    case 11:
      return 'J'
    default:
      return String(rank)
  }
}

export default function Card ({ card, unplayable, className, selected, onClick, playerInitial, winner }: Props) {
  // noinspection JSUnusedGlobalSymbols
  const clickProps = onClick && !unplayable
    ? {
        onClick: () => { onClick(card, 1) },
        onDoubleClick: () => { onClick(card, 2) }
      }
    : {}

  const classes = classNames(
    'playing-card',
    className,
    {
      selectable: Boolean(clickProps.onClick) && !selected,
      unplayable,
      selected,
      winner
    }
  )

  return (
    <div className={classes} {...clickProps}>
      <div>
        <span className='rank'>
          {rankSymbol(card.rank)}
        </span>
        <SuitSymbol suit={card.suit} />
      </div>
      {
        playerInitial ? <div className='player-initial'>{playerInitial}</div> : undefined
      }
    </div>
  )
}

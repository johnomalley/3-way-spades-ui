import React from 'react'
import { Card as CardType } from './gameReducer'
import SuitSymbol from '../common/SuitSymbol'
import classNames from 'classnames'

type Props = Readonly<{
  card: CardType
  className?: string
  selected?: boolean
  onClick?: (card: CardType, clickCount: number) => void
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

export default function Card ({ card, className, selected, onClick }: Props) {
  // noinspection JSUnusedGlobalSymbols
  const clickProps = onClick
    ? {
        onClick: () => onClick(card, 1),
        onDoubleClick: () => onClick(card, 2)
      }
    : {}

  return (
    <div className={classNames('playing-card', className, { selectable: Boolean(onClick), selected })} {...clickProps}>
      <span className='rank'>
        {rankSymbol(card.rank)}
      </span>
      <SuitSymbol suit={card.suit} />
    </div>
  )
}

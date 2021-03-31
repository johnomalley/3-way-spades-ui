import * as React from 'react'
import { Card as CardType } from './gameReducer'
import SuitSymbol from '../common/SuitSymbol'
import classNames = require('classnames')

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

export default class Card extends React.PureComponent<Props> {
  onClick = () => {
    this.onClickDelegate(1)
  }

  onDoubleClick = () => {
    this.onClickDelegate(2)
  }

  onClickDelegate = (clickCount: number) => {
    this.props.onClick!(this.props.card, clickCount)
  }

  render (): React.ReactNode {
    const { card, className, onClick, selected } = this.props
    return (
      <div
        className={classNames('playing-card', className, { selectable: Boolean(onClick), selected })}
        onClick={onClick ? this.onClick : undefined} onDoubleClick={onClick ? this.onDoubleClick : undefined}
      >
        <span className='rank'>
          {rankSymbol(card.rank)}
        </span>
        <SuitSymbol suit={card.suit} />
      </div>
    )
  }
}

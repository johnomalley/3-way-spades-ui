import groupBy = require('lodash/groupBy')
import { Dispatch } from 'redux'
import * as React from 'react'
import { Card as CardType, HandPhase, PlayerView } from './gameReducer'
import Card from './Card'
import { gameSelectCard } from './actions'
import { Suit } from '../common/types'

type Props = Readonly<{
  playerView: PlayerView
  selectedCard?: CardType
  playCard?: (card: CardType) => void
  dispatch: Dispatch
}>

const suits = [
  Suit.Spades,
  Suit.Hearts,
  Suit.Clubs,
  Suit.Diamonds
]

export default class Hand extends React.PureComponent<Props> {
  selectCardAndMaybePlay = (card: CardType, clickCount: number) => {
    this.props.dispatch({ type: gameSelectCard, payload: card })
    if (clickCount > 1 && this.props.playCard) {
      this.props.playCard(card)
    }
  }

  render (): React.ReactNode {
    const { playerView, selectedCard } = this.props
    const onClick = playerView.phase === HandPhase.Play ? this.selectCardAndMaybePlay : undefined
    const cardsBySuit = groupBy(playerView.cardsInHand, _ => _.suit)
    return (
      <div className='player-hand'>
        {
          suits.map(suit =>
            <div key={suit} className='player-hand-suit'>
              {
                cardsBySuit[suit] ? (
                  cardsBySuit[suit].map(card =>
                    <Card key={card.rank} card={card} selected={card === selectedCard} onClick={onClick}/>
                  )
                ) : (
                  <div className='playing-card invisible'/>
                )
              }
            </div>
          )
        }
      </div>
    )
  }
}

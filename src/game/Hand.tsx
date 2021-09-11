import { Dispatch } from 'redux'
import React from 'react'
import { Card as CardType, HandPhase, PlayerView } from './gameReducer'
import Card from './Card'
import { gameSelectCard } from './actions'
import { Suit } from '../common/types'
import groupBy from 'lodash/groupBy'

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

export default function Hand ({ playerView, selectedCard, playCard, dispatch }: Props) {
  const onClick = playerView.phase === HandPhase.Play
    ? (card: CardType, clickCount: number) => {
        dispatch({ type: gameSelectCard, payload: card })
        if (clickCount > 1 && playCard) {
          playCard(card)
        }
      }
    : undefined

  const cardsBySuit = groupBy(playerView.cardsInHand, _ => _.suit)
  return (
    <div className='player-hand'>
      {
        suits.map(suit =>
          <div key={suit} className='player-hand-suit'>
            {
              cardsBySuit[suit]
                ? (
                    cardsBySuit[suit].map(card =>
                    <Card key={card.rank} card={card} selected={card === selectedCard} onClick={onClick} />
                    )
                  )
                : (
                  <div className='playing-card invisible' />
                  )
            }
          </div>
        )
      }
    </div>
  )
}

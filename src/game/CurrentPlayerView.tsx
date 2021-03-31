import * as React from 'react'
import { Dispatch } from 'redux'
import { BidRange, Card, HandPhase, PlayerView, Trick } from './gameReducer'
import Hand from './Hand'
import { gamePlay } from './actions'
import { Suit } from '../common/types'
import PlayerHeader from './PlayerHeader'
import BidButtons from './BidButtons'
import last = require('lodash/last')

type Props = Readonly<{
  playerView: PlayerView
  busy: boolean
  bidRange: BidRange
  bid?: number
  selectedCard?: Card
  dispatch: Dispatch
}>

const getSmallestClub = (cards: ReadonlyArray<Card>): Card | undefined => {
  let smallest: Card | undefined
  for (const c of cards.filter(_ => _.suit === Suit.Clubs)) {
    if (!smallest || c.rank < smallest.rank) {
      smallest = c
    }
  }
  return smallest
}

const canPlayOnFirstTrick = (cards: ReadonlyArray<Card>, card: Card) => {
  const smallest = getSmallestClub(cards)
  if (smallest) {
    return smallest === card
  } else {
    return card.suit !== Suit.Spades
  }
}

const spadesBroken = (tricks: ReadonlyArray<Trick>) =>
  tricks.some(_ => _.cards.some(_ => _.suit === Suit.Spades))

const hasOnlySpades = (cards: ReadonlyArray<Card>) => cards.every(_ => _.suit === Suit.Spades)

const canPlayCard = (playerView: PlayerView, card: Card): boolean => {
  const cards = playerView.cardsInHand
  if (playerView.cardsPlayed.length === 0) {
    return canPlayOnFirstTrick(cards, card)
  } else {
    const { tricks } = playerView
    const trick = last(tricks)!
    if (trick.cards.length === 3) {
      return card.suit !== Suit.Spades || spadesBroken(tricks) || hasOnlySpades(cards)
    } else {
      const { suit } = trick.cards[0]!
      return suit === card.suit || cards.every(_ => _.suit !== suit)
    }
  }
}

export default class CurrentPlayerView extends React.PureComponent<Props> {
  isPlayEnabled = (): boolean => {
    const { playerView, busy, selectedCard } = this.props
    if (playerView.playerNumber !== playerView.currentPlayerNumber || busy) {
      return false
    } else {
      return Boolean(
        playerView.phase === HandPhase.Play && selectedCard && canPlayCard(playerView, selectedCard)
      )
    }
  }

  playCard = (card: Card) => {
    this.props.dispatch({ type: gamePlay, payload: card })
  }

  playSelectedCard = () => {
    this.playCard(this.props.selectedCard!)
  }

  render (): React.ReactNode {
    const { playerView, busy, bidRange, bid, selectedCard, dispatch } = this.props
    const playEnabled = this.isPlayEnabled()
    const playCard = playEnabled ? this.playCard : undefined
    return (
      <div className='column is-half current-player'>
        <div className='card'>
          <PlayerHeader playerView={playerView} busy={busy} playerNumber={playerView.playerNumber} />
          <div className='card-content'>
            <Hand playerView={playerView} selectedCard={selectedCard} playCard={playCard} dispatch={dispatch} />
            <div className='buttons'>
              {
                playerView.phase === HandPhase.Bidding ? (
                  <BidButtons
                    playerView={playerView} busy={busy}
                    bidRange={bidRange} bid={bid} dispatch={dispatch}
                  />
                ) : (
                  <button
                    className='button is-primary'
                    disabled={!playEnabled}
                    onClick={this.playSelectedCard}
                  >
                    Play
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

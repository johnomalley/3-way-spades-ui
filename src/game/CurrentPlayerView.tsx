import React from 'react'
import { Dispatch } from 'redux'
import { BidRange, Card, HandPhase, PlayerView, Trick } from './gameReducer'
import Hand from './Hand'
import { gamePlay } from './actions'
import { Suit } from '../common/types'
import PlayerHeader from './PlayerHeader'
import BidButtons from './BidButtons'
import last from 'lodash/last'

type Props = Readonly<{
  playerView: PlayerView
  busy: boolean
  bidRange: BidRange
  bid?: number
  selectedCard?: Card
  dispatch: Dispatch
}>

const getSmallestClub = (cards: readonly Card[]): Card | undefined => {
  let smallest: Card | undefined
  for (const c of cards.filter(_ => _.suit === Suit.Clubs)) {
    if (!smallest || c.rank < smallest.rank) {
      smallest = c
    }
  }
  return smallest
}

const canPlayOnFirstTrick = (cards: readonly Card[], card: Card) => {
  const smallest = getSmallestClub(cards)
  if (smallest) {
    return smallest === card
  } else {
    return card.suit !== Suit.Spades
  }
}

const spadesBroken = (tricks: readonly Trick[]) =>
  tricks.some(_ => _.cards.some(_ => _.suit === Suit.Spades))

const hasOnlySpades = (cards: readonly Card[]) => cards.every(_ => _.suit === Suit.Spades)

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

export default function CurrentPlayerView ({ playerView, busy, bidRange, bid, selectedCard, dispatch }: Props) {
  const isPlayEnabled = () => {
    if (playerView.playerNumber !== playerView.currentPlayerNumber || busy) {
      return false
    } else {
      return Boolean(
        playerView.phase === HandPhase.Play && selectedCard && canPlayCard(playerView, selectedCard)
      )
    }
  }

  const playEnabled = isPlayEnabled()

  const playCard = playEnabled
    ? (card: Card) => {
        dispatch({ type: gamePlay, payload: card })
      }
    : undefined

  const playButtonProps = {
    className: 'button is-primary',
    disabled: !playEnabled,
    ...playEnabled
      ? {
          onClick: () => playCard!(selectedCard!)
        }
      : {}
  }

  return (
    <div className='column is-half current-player'>
      <div className='card'>
        <PlayerHeader playerView={playerView} busy={busy} playerNumber={playerView.playerNumber} />
        <div className='card-content'>
          <Hand playerView={playerView} selectedCard={selectedCard} playCard={playCard} dispatch={dispatch} />
          <div className='buttons'>
            {
              playerView.phase === HandPhase.Bidding
                ? (
                  <BidButtons
                    playerView={playerView} busy={busy}
                    bidRange={bidRange} bid={bid} dispatch={dispatch}
                  />
                  )
                : (
                  <button {...playButtonProps}>
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

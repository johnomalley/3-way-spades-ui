import React from 'react'
import { type Card as CardType, type PlayerViewPlayer, type Trick } from './gameReducer'
import { Suit } from '../common/commonTypes'
import Card from './Card'
import classNames from 'classnames'

type Props = Readonly<{
  players: readonly PlayerViewPlayer[]
  tricks: readonly Trick[]
}>

type LastTrickCard = CardType & Readonly<{
  playerInitial: string
  winner: boolean
}>

const hiddenCards: readonly LastTrickCard[] = [0, 1, 2].map(i => ({
  playerInitial: String(i),
  winner: false,
  suit: Suit.Clubs,
  rank: 2
}))

const getLastTrickCards = (players: readonly PlayerViewPlayer[], tricks: readonly Trick[]): readonly LastTrickCard[] => {
  if (tricks.length < 2) {
    return hiddenCards
  } else {
    const { cards, leader, winner } = tricks[tricks.length - 2]
    return cards.map((c, i) => {
      const playerNumber = (leader + i) % cards.length
      return {
        ...c,
        playerInitial: players[playerNumber].name[0],
        visible: true,
        winner: playerNumber === winner
      }
    })
  }
}

export default function LastTrick ({ players, tricks }: Props) {
  return (
    <div className={classNames('last-trick', { 'is-invisible': tricks.length < 2 })}>
      {
        getLastTrickCards(players, tricks).map((card: LastTrickCard) => (
          <Card key={card.playerInitial} card={card} playerInitial={card.playerInitial} winner={card.winner} />
        ))
      }
    </div>
  )
}

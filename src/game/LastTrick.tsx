import React from 'react'
import { type Card as CardType, type PlayerViewPlayer, type Trick } from './gameReducer'
import { Suit } from '../common/commonTypes'
import Card from './Card'
import classNames from 'classnames'
import { useAppSelector } from '../store/createStore'
import selectPlayersById from '../setup/selectPlayersById'

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

const getLastTrickCards = ({ players, tricks }: Props): readonly LastTrickCard[] => {
  const playersById = useAppSelector(selectPlayersById)
  if (tricks.length < 2) {
    return hiddenCards
  } else {
    const { cards, leader, winner } = tricks[tricks.length - 2]
    return cards.map((c, i) => {
      const playerNumber = (leader + i) % cards.length
      return {
        ...c,
        playerInitial: playersById[players[playerNumber].id].displayName[0],
        visible: true,
        winner: playerNumber === winner
      }
    })
  }
}

export default function LastTrick (props: Props) {
  return (
    <div className={classNames('last-trick', { 'is-invisible': props.tricks.length < 2 })}>
      {
        getLastTrickCards(props).map((card: LastTrickCard) => (
          <Card key={card.playerInitial} card={card} playerInitial={card.playerInitial} winner={card.winner} />
        ))
      }
    </div>
  )
}

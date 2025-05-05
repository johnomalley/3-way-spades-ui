import React from 'react'
import { Suit } from '../common/commonTypes'
import Card from './Card'
import classNames from 'classnames'
import { createAppSelector, useAppSelector } from '../store/createStore'
import { type Trick } from './gameReducer'

const dummyTrick: Trick = {
  winner: 0,
  leader: 0,
  cards: [2, 3, 4].map(rank => ({
    rank,
    suit: Suit.Clubs
  }))
}

const selectProps = createAppSelector(
  [
    _ => _.game.playerView?.players,
    _ => _.setup.players,
    _ => _.game.playerView?.lastTrick
  ],
  (players, playersById, lastTrick) => ({
    players: players ?? [],
    playersById,
    lastTrick
  })
)

export default function LastTrick () {
  const {
    players,
    playersById,
    lastTrick
  } = useAppSelector(selectProps)

  const trick: Trick = lastTrick ?? dummyTrick

  return (
    <div className={classNames('last-trick', { 'is-invisible': !lastTrick })}>
      {
        trick.cards.map((card, i) => {
          const playerNumber = (trick.leader + i) % players.length
          const player = players[playerNumber]
          const { displayName } = playersById[player.id]

          return (
            <Card key={player.id} card={card} playerInitial={displayName.slice(0, 1)} winner={trick.winner === playerNumber}/>
          )
        })
      }
    </div>
  )
}

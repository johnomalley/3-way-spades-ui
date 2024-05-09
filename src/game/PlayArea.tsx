import React from 'react'
import { type Card, type PlayerView, type Trick } from './gameReducer'
import PlayAreaCard from './PlayAreaCard'
import last from 'lodash/last'

type Props = Readonly<{
  playerView: PlayerView
}>

type CardByPlayerNumber = Record<number, Card>

const getCardsByPlayerNumber = (trick?: Trick): CardByPlayerNumber => {
  const result: CardByPlayerNumber = {}
  if (trick) {
    const { cards, leader } = trick
    for (let i = 0; i < cards.length; i++) {
      result[(leader + i) % 3] = cards[i]
    }
  }
  return result
}

export default function PlayArea ({ playerView }: Props) {
  const { tricks, players, playerNumber } = playerView
  const trick = last(tricks)
  const cardsByPlayerNumber = getCardsByPlayerNumber(trick)
  const leftPlayerNumber = (playerNumber + 2) % 3
  const rightPlayerNumber = (playerNumber + 1) % 3
  const leader = trick ? trick.leader : -1
  return (
    <div className='column is-half play-area'>
      <div className='card'>
        <div className='card-content'>
          <div className='level current-player-area'>
            <PlayAreaCard lead={playerNumber === leader} card={cardsByPlayerNumber[playerNumber]} />
          </div>
          <div className='level opponent-area'>
            <div className='level-left'>
              <PlayAreaCard
                lead={leftPlayerNumber === leader}
                side='left' playerName={players[leftPlayerNumber].name}
                card={cardsByPlayerNumber[leftPlayerNumber]}
              />
            </div>
            <div className='level-right'>
              <PlayAreaCard
                lead={rightPlayerNumber === leader}
                side='right' playerName={players[rightPlayerNumber].name}
                card={cardsByPlayerNumber[rightPlayerNumber]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

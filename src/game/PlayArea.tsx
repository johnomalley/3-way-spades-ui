import React from 'react'
import { type Card, type PlayerView, type Trick } from './gameReducer'
import PlayAreaCard from './PlayAreaCard'
import last from 'lodash/last'
import LastTrick from './LastTrick'
import { useAppSelector } from '../store/createStore'
import selectPlayersById from '../setup/selectPlayersById'

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
  const playersById = useAppSelector(selectPlayersById)
  const { tricks, players, playerNumber } = playerView
  const trick = last(tricks)
  const cardsByPlayerNumber = getCardsByPlayerNumber(trick)
  const leftPlayerNumber = (playerNumber + 2) % 3
  const rightPlayerNumber = (playerNumber + 1) % 3
  const leader = trick ? trick.leader : -1
  const winner = trick ? trick.winner : -1

  const leftPlayer = playersById[players[leftPlayerNumber].id]
  const rightPlayer = playersById[players[rightPlayerNumber].id]

  return (
    <div className='column is-half play-area'>
      <div className='card'>
        <div className='card-content'>
          <LastTrick players={players} tricks={tricks} />
          <div className='level current-player-area'>
            <PlayAreaCard
              lead={playerNumber === leader}
              winner={playerNumber === winner}
              card={cardsByPlayerNumber[playerNumber]}
            />
          </div>
          <div className='level opponent-area'>
            <div className='level-left'>
              <PlayAreaCard
                lead={leftPlayerNumber === leader}
                winner={leftPlayerNumber === winner}
                side='left'
                playerName={leftPlayer.displayName}
                card={cardsByPlayerNumber[leftPlayerNumber]}
              />
            </div>
            <div className='level-right'>
              <PlayAreaCard
                lead={rightPlayerNumber === leader}
                winner={rightPlayerNumber === winner}
                side='right'
                playerName={rightPlayer.displayName}
                card={cardsByPlayerNumber[rightPlayerNumber]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

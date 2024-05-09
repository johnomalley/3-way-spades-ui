import React from 'react'
import { HandPhase, type PlayerView } from './gameReducer'
import last from 'lodash/last'
import range from 'lodash/range'

export type Props = Readonly<{
  playerView: PlayerView
  playerNumber: number
}>

const getCardCount = (playerView: PlayerView, playerNumber: number) => {
  if (playerView.tricks.length === 0) {
    return 17
  } else if (playerView.phase === HandPhase.Complete) {
    return 0
  } else {
    const lastTrick = last(playerView.tricks)!
    const position = ((3 + playerNumber) - lastTrick.leader) % 3
    return 17 - playerView.tricks.length + (position < lastTrick.cards.length ? 0 : 1)
  }
}

export default function OpponentCardsView ({ playerView, playerNumber }: Props) {
  const cardCount = getCardCount(playerView, playerNumber)
  return (
    <div className='card-content'>
      {
        cardCount === 0
          ? <div className='playing-card invisible' />
          : range(cardCount).map(i => <div key={i} className='playing-card face-down' />)
      }
    </div>
  )
}

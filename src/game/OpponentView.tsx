import React from 'react'
import { type PlayerView } from './gameReducer'
import PlayerHeader from './PlayerHeader'
import OpponentCardsView from './OpponentCardsView'

export type OpponentViewProps = Readonly<{
  playerView: PlayerView
  playerNumber: number
}>

export default function OpponentView ({ playerView, playerNumber }: OpponentViewProps) {
  return (
    <div className='column is-half opponent'>
      <div className='card'>
        <PlayerHeader playerView={playerView} playerNumber={playerNumber} />
        <OpponentCardsView playerView={playerView} playerNumber={playerNumber} />
      </div>
    </div>
  )
}

import React from 'react'
import { type Game } from './gameListReducer'

type Props = Readonly<{
  game: Game
}>

export default function PlayerScores ({ game: { players } }: Props) {
  return (
    <>
      {
        players.map(player =>
          <span key={player.id} className='mr-4'>
            {`${player.displayName}: ${player.points}`}
          </span>
        )
      }
    </>
  )
}

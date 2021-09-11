import React from 'react'
import { Game } from './gameListReducer'
import GameListRow from './GameListRow'

type Props = Readonly<{
  games: readonly Game[]
}>

export default function GameList ({ games }: Props) {
  return (
      <table className='table'>
        <tbody>
          {
          games.map(game =>
            <GameListRow key={game.id} game={game} />
          )
        }
        </tbody>
      </table>
  )
}

import React from 'react'
import { type Game } from './gameListReducer'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'
import DeleteGameButton from './DeleteGameButton'
import PlayerScores from './PlayerScores'
import ConfirmDeleteGame from './ConfirmDeleteGame'
import { type PlayersById } from '../setup/setupReducer'

type Props = Readonly<{
  game: Game
  players: PlayersById
  deleteGameId?: string
  playerId: string
}>

export default function GameListRow ({ game, players, deleteGameId, playerId }: Props) {
  const isAdmin = players[playerId].admin
  return (
      <tr>
        <td>
          <Link to={`/games/${game.id}`}>
            {DateTime.fromISO(game.startTime).toRelative()}
            <i className='fa-solid fa-arrow-right ml-2'/>
          </Link>
        </td>
        <td>
          {deleteGameId !== game.id && isAdmin ? <DeleteGameButton gameId={game.id} deleteGameId={deleteGameId} /> : undefined}
        </td>
        <td>
          {deleteGameId === game.id ? <ConfirmDeleteGame gameId={game.id} /> : <PlayerScores game={game} />}
        </td>
      </tr>
  )
}

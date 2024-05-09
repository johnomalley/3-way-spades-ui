import React from 'react'
import { type Game } from './gameListReducer'
import { Link } from 'react-router-dom'
import sortBy from 'lodash/sortBy'
import { DateTime } from 'luxon'
import classNames from 'classnames'

type Props = Readonly<{
  game: Game
}>

export default function GameListRow ({ game }: Props) {
  return (
      <tr>
        <td>
          <Link to={`/games/${game.id}`}>
            {DateTime.fromISO(game.startTime).toRelative()}
          </Link>
        </td>
        {
          sortBy(game.players, _ => -1 * _.points).map((player, i) =>
            <td key={player.id} className={classNames({ winner: i === 0 })}>
              {`${player.name}: ${player.points}`}
            </td>
          )
        }
      </tr>
  )
}

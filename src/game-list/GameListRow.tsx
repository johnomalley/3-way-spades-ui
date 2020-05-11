import sortBy = require('lodash/sortBy')
import moment = require('moment')
import classNames = require('classnames')
import * as React from 'react'
import { Game } from './gameListReducer'
import { Link } from 'react-router-dom'

type Props = Readonly<{
  game: Game
}>

export default class GameListRow extends React.PureComponent<Props> {
  render () {
    const { game } = this.props
    return (
      <tr>
        <td>
          <Link to={`/games/${game.id}`}>
            {moment(game.startTime).fromNow()}
          </Link>
        </td>
        {
          sortBy(game.players, _ => -1 * _.points).map((player, i) =>
            <td key={player.id} className={classNames({ winner: i === 0})}>
              {`${player.name}: ${player.points}`}
            </td>
          )
        }
      </tr>
    )
  }
}

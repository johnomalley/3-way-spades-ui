import * as React from 'react'
import { Game } from './gameListReducer'
import GameListRow from './GameListRow'

type Props = Readonly<{
  games: ReadonlyArray<Game>
}>

export default class GameList extends React.PureComponent<Props> {
  render () {
    return (
      <table className='table'>
        <tbody>
          {
          this.props.games.map(game =>
            <GameListRow key={game.id} game={game} />
          )
        }
        </tbody>
      </table>
    )
  }
}

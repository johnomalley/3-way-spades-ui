import React, { useCallback } from 'react'
import { type Game } from './gameListReducer'
import GameListRow from './GameListRow'
import { useDispatch } from 'react-redux'
import { gameListNew } from './gameListActions'

type Props = Readonly<{
  games: readonly Game[]
}>

export default function GameList ({ games }: Props) {
  const dispatch = useDispatch()

  const createNewGame = useCallback(() => {
    dispatch({ type: gameListNew })
  }, [dispatch])

  return (
      <div className='card mb-4'>
        <header className="card-header">
          <p className="card-header-title">Active Games ({games.length})</p>
        </header>
        <div className='card-content'>
          <table className='table'>
            <tbody>
            {
              games.map(game =>
                <GameListRow key={game.id} game={game} />
              )
            }
            </tbody>
          </table>
        </div>
        <div className='card-footer'>
          <button className='button is-primary' onClick={createNewGame}>
            New Game
          </button>
        </div>
      </div>
  )
}

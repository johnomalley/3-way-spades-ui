import React, { useCallback, useEffect, useState } from 'react'
import { type Game } from './gameListReducer'
import GameListRow from './GameListRow'
import { useDispatch } from 'react-redux'
import { gameListClearDeletedGame, gameListNew } from './gameListActions'
import { useAppSelector } from '../store/createStore'
import { type State } from '../store/storeTypes'

type Props = Readonly<{
  games: readonly Game[]
}>

const selectProps = ({ gameList, setup }: State) => ({
  deleteGameId: gameList.deleteGameId,
  playerId: setup.credentials.playerId,
  players: setup.players
})

const newGameDelay = 300

export default function GameList ({ games }: Props) {
  const dispatch = useDispatch()

  const [newGamePending, setNewGamePending] = useState(false)

  const { deleteGameId, playerId, players } = useAppSelector(selectProps)

  const createNewGame = useCallback(() => {
    setNewGamePending(true)
    window.setTimeout(() => {
      dispatch({ type: gameListNew })
    }, newGameDelay)
  }, [dispatch])

  useEffect(
    () =>
      () => {
        dispatch({ type: gameListClearDeletedGame })
      },
    [dispatch]
  )

  return (
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title'>
            <span>Games</span>
            {
              games.length === 0 ? undefined : <span>&nbsp;({games.length})</span>
            }
            <button
              className='button is-small is-primary ml-4'
              title='Create new game'
              onClick={createNewGame}
              disabled={newGamePending}
            >
              <i className='fas fa-plus' />
            </button>
          </p>
        </header>
        <div className='card-content'>
          {games.length === 0 ? <article className='message is-info'>No active games</article> : undefined}
          <table className='table'>
            <tbody>
            {
              games.map(game =>
                <GameListRow key={game.id} game={game} players={players} deleteGameId={deleteGameId} playerId={playerId} />
              )
            }
            </tbody>
          </table>
        </div>
      </div>
  )
}

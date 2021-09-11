import React, { useEffect } from 'react'
import { DefaultDispatchProps } from '../common/types'
import GameList from './GameList'
import { GameListState } from './gameListReducer'
import mapDispatchToProps from '../common/mapDispatchToProps'
import { connect } from 'react-redux'
import { State } from '../store/types'
import { gameListGet, gameListNew } from './actions'
import MainView from '../common/MainView'
import WaitSpinner from '../common/WaitSpinner'

type StateProps = GameListState & Readonly<{
  credentialsValid: boolean
}>

type Props = StateProps & DefaultDispatchProps

function GameListViewContainer ({ games, busy, error, credentialsValid, dispatch, push }: Props) {
  useEffect(() => {
    if (credentialsValid) {
      dispatch({ type: gameListGet })
    } else {
      push('/setup')
    }
  }, [])

  const createNewGame = () => {
    dispatch({ type: gameListNew })
  }

  const title = 'Active Games' + (busy ? '' : `(${games.length})`)
  return (
      <MainView error={error} title={title}>
        {
          busy
            ? <WaitSpinner />
            : (
            <GameList games={games} />
              )
        }
        <div className='buttons'>
          <button className='button is-primary' onClick={createNewGame}>
            New Game
          </button>
        </div>
      </MainView>
  )
}

export const mapStateToProps = ({ setup: { credentialsValid }, gameList: { games, busy, error } }: State): StateProps => ({
  games,
  busy,
  error,
  credentialsValid
})

export default connect(mapStateToProps, mapDispatchToProps)(GameListViewContainer)

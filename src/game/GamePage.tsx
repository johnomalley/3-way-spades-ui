import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { type State } from '../store/storeTypes'
import { gameGet } from './gameActions'
import { type PlayerView } from './gameReducer'
import WaitSpinner from '../common/WaitSpinner'
import CurrentPlayerView from './CurrentPlayerView'
import OpponentView, { type OpponentViewProps } from './OpponentView'
import PlayArea from './PlayArea'
import changePoller from './changePoller'
import range from 'lodash/range'
import { useAppSelector } from '../store/createStore'
import { push } from 'redux-first-history'
import { useMatch } from 'react-router-dom'

const selectProps = ({ setup, game }: State) => ({
  setupStatus: setup.status,
  playerView: game.playerView,
  busy: game.busy,
  selectedCard: game.selectedCard,
  bidRange: game.bidRange,
  bid: game.bid
})

const getOpponentProps = (playerView?: PlayerView): readonly OpponentViewProps[] => {
  if (playerView) {
    const playerNumbers = range(1, 3).map(n => (playerView.playerNumber + n) % playerView.players.length)
    return playerNumbers.map(playerNumber => ({
      playerView,
      playerNumber
    })).reverse()
  } else {
    return []
  }
}

export default function GamePage () {
  const dispatch = useDispatch()
  const match = useMatch('/games/:id')
  const gameId = match?.params.id

  const {
    setupStatus,
    playerView,
    busy,
    selectedCard,
    bidRange,
    bid
  } = useAppSelector(selectProps)

  useEffect(() => {
    if (setupStatus === 'invalid' || !gameId) {
      dispatch(push('/setup'))
    } else if (setupStatus === 'initialized') {
      dispatch({ type: gameGet, payload: gameId })
      changePoller.start()
      return () => {
        changePoller.stop()
      }
    }
  }, [dispatch, setupStatus])

  return (
    <div className='game p-4'>
      {
        playerView
          ? (
            <>
              <div className='columns'>
                <CurrentPlayerView
                  playerView={playerView}
                  busy={busy}
                  bidRange={bidRange}
                  bid={bid}
                  selectedCard={selectedCard}
                  dispatch={dispatch}
                />
                <PlayArea playerView={playerView} />
              </div>
              <div className='columns'>
                {
                  getOpponentProps(playerView).map(props =>
                    <OpponentView key={props.playerNumber} {...props} />
                  )
                }
              </div>
            </>
            )
          : <WaitSpinner className='pt-4' />
      }
    </div>
  )
}

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { gameGet } from './gameActions'
import { type PlayerView } from './gameReducer'
import WaitSpinner from '../common/WaitSpinner'
import CurrentPlayerView from './CurrentPlayerView'
import OpponentView, { type OpponentViewProps } from './OpponentView'
import PlayArea from './PlayArea'
import changePoller from './changePoller'
import range from 'lodash/range'
import { createAppSelector, useAppSelector } from '../store/createStore'
import { useMatch } from 'react-router-dom'
import { replace } from '../router/routerActions'

const selectProps = createAppSelector(
  [
    _ => _.setup.status,
    _ => _.game.playerView,
    _ => _.game.busy,
    _ => _.game.selectedCard,
    _ => _.game.bidRange,
    _ => _.game.bid
  ],
  (setupStatus, playerView, busy, selectedCard, bidRange, bid ) => ({
    setupStatus,
    playerView,
    busy,
    selectedCard,
    bidRange,
    bid
  })
)

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
      dispatch(replace('/setup'))
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

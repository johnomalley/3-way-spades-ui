import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { DefaultDispatchProps } from '../common/types'
import mapDispatchToProps from '../common/mapDispatchToProps'
import { connect } from 'react-redux'
import { State } from '../store/types'
import { gameGet } from './actions'
import { GameState, PlayerView } from './gameReducer'
import WaitSpinner from '../common/WaitSpinner'
import CurrentPlayerView from './CurrentPlayerView'
import OpponentView, { OpponentViewProps } from './OpponentView'
import PlayArea from './PlayArea'
import changePoller from './changePoller'
import range from 'lodash/range'

type StateProps = GameState & Readonly<{
  credentialsValid: boolean
}>

type Props = StateProps & DefaultDispatchProps & RouteComponentProps<{ id: string }>

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

function GameContainer ({ playerView, busy, selectedCard, bidRange, bid, dispatch, match }: Props) {
  useEffect(() => {
    dispatch({ type: gameGet, payload: match.params.id })
    changePoller.start()

    return () => {
      changePoller.stop()
    }
  }, [])

  return (
    <div className='game'>
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
          : <WaitSpinner />
      }
    </div>
  )
}

export const mapStateToProps = ({ setup: { credentialsValid }, game }: State): StateProps => ({
  ...game,
  credentialsValid
})

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)

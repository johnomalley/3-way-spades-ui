import * as React from 'react'
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
import range = require('lodash/range')

type StateProps = GameState & Readonly<{
  credentialsValid: boolean
}>

type Props = StateProps & DefaultDispatchProps & RouteComponentProps<{ id: string }>

const getOpponentProps = (playerView?: PlayerView): ReadonlyArray<OpponentViewProps> => {
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

class GameContainer extends React.PureComponent<Props> {
  componentDidMount (): void {
    this.props.dispatch({ type: gameGet, payload: this.props.match.params.id })
    changePoller.start()
  }

  componentWillUnmount (): void {
    changePoller.stop()
  }

  render (): React.ReactNode {
    const { playerView, busy, selectedCard, bidRange, bid, dispatch } = this.props
    return (
      <div className='game'>
        {
          playerView ? (
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
          ) : <WaitSpinner />
        }
      </div>
    )
  }
}

export const mapStateToProps = ({ setup: { credentialsValid }, game }: State): StateProps => ({
  ...game,
  credentialsValid
})

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)

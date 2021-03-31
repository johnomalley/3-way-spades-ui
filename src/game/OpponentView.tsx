import * as React from 'react'
import { PlayerView } from './gameReducer'
import PlayerHeader from './PlayerHeader'
import OpponentCardsView from './OpponentCardsView'

export type OpponentViewProps = Readonly<{
  playerView: PlayerView
  playerNumber: number
}>

export default class OpponentView extends React.PureComponent<OpponentViewProps> {
  render (): React.ReactNode {
    const { playerView, playerNumber } = this.props
    return (
      <div className='column is-half opponent'>
        <div className='card'>
          <PlayerHeader playerView={playerView} playerNumber={playerNumber} />
          <OpponentCardsView playerView={playerView} playerNumber={playerNumber} />
        </div>
      </div>
    )
  }
}

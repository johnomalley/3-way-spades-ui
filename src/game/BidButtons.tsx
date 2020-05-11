import range = require('lodash/range')

import * as React from 'react'
import { Dispatch } from 'redux'
import { BidRange, PlayerView } from './gameReducer'
import classNames = require('classnames')
import { gameBid, gameScrollBid, gameUpdateBid } from './actions'

type Props = Readonly<{
  playerView: PlayerView
  busy: boolean
  bid?: number
  bidRange: BidRange
  dispatch: Dispatch
}>


export default class BidButtons extends React.PureComponent<Props> {
  scrollDown = () => {
    this.scroll(-1)
  }

  scrollUp = () => {
    this.scroll(1)
  }

  scroll (delta: number) {
    this.props.dispatch({ type: gameScrollBid, payload: delta })
  }

  selectBid (bid: number) {
    this.props.dispatch({ type: gameUpdateBid, payload: bid })
  }

  dispatchBid = () => {
    this.props.dispatch({ type: gameBid, payload: this.props.bid })
  }

  render (): React.ReactNode {
    const { bidRange: { min, max }, busy, bid, playerView } = this.props
    const allDisabled = busy || playerView.playerNumber !== playerView.currentPlayerNumber
    return (
      <React.Fragment>
        <button className='button bid-button' disabled={allDisabled || min === 0} onClick={this.scrollDown}>
          -
        </button>
        {
          range(min, max + 1).map(i =>
            <button key={i} disabled={allDisabled}
                    className={classNames('button', 'bid-button', { 'is-info': bid === i })}
                    onClick={bid === i ? undefined : () => this.selectBid(i)}>
              {i === 0 ? 'N' : String(i)}
            </button>
          )
        }
        <button className='button bid-button' disabled={allDisabled || max === 17} onClick={this.scrollUp}>
          +
        </button>
        <button className='button is-primary' disabled={allDisabled || bid === undefined} onClick={this.dispatchBid}>
          Bid
        </button>

      </React.Fragment>
    )
  }
}

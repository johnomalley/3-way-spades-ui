import React from 'react'
import { type Dispatch } from 'redux'
import { type BidRange, type PlayerView } from './gameReducer'
import { gameBid, gameScrollBid, gameShowCards, gameUpdateBid } from './actions'
import range from 'lodash/range'
import classNames from 'classnames'

type Props = Readonly<{
  playerView: PlayerView
  busy: boolean
  bid?: number
  bidRange: BidRange
  dispatch: Dispatch
}>

export default function BidButtons ({ playerView, busy, bid, bidRange: { min, max }, dispatch }: Props) {
  const scroll = (delta: number) => {
    dispatch({ type: gameScrollBid, payload: delta })
  }

  const selectBid = (bid: number) => {
    dispatch({ type: gameUpdateBid, payload: bid })
  }

  const allDisabled = busy || playerView.playerNumber !== playerView.currentPlayerNumber
  return (
    <>
      {
        playerView.cardsVisible
          ? (
            <>
              <button className='button bid-button' disabled={allDisabled || min === 0} onClick={() => { scroll(-1) }}>
                -
              </button>
              {
                range(min, max + 1).map(i =>
                  <button
                    key={i} disabled={allDisabled}
                    className={classNames('button', 'bid-button', { 'is-info': bid === i })}
                    onClick={bid === i ? undefined : () => { selectBid(i) }}
                  >
                    {i === 0 ? 'N' : String(i)}
                  </button>
                )
              }
              <button className='button bid-button' disabled={allDisabled || max === 17} onClick={() => { scroll(1) }}>
                +
              </button>
            </>
            )
          : (
            <>
              <button className='button bid-button' disabled={allDisabled} onClick={() => { selectBid(-1) }}>
                Double Nil
              </button>
              <button className='button bid-button' disabled={busy} onClick={() => dispatch({ type: gameShowCards })}>
                Show Cards
              </button>
            </>
            )
      }
      <button className='button is-primary'
              disabled={allDisabled || bid === undefined}
              onClick={() => dispatch({ type: gameBid, payload: bid })}>
        Bid
      </button>
    </>
  )
}

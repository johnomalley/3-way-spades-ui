import React from 'react'
import { type Dispatch } from 'redux'
import { type BidRange, type Card, HandPhase, type PlayerView } from './gameReducer'
import Hand from './Hand'
import { gamePlay } from './gameActions'
import PlayerHeader from './PlayerHeader'
import BidButtons from './BidButtons'

type Props = Readonly<{
  playerView: PlayerView
  busy: boolean
  bidRange: BidRange
  bid?: number
  selectedCard?: Card
  dispatch: Dispatch
}>

const canPlayCard = (playerView: PlayerView, card: Card): boolean => playerView.cardsPlayable.includes(card)

export default function CurrentPlayerView ({ playerView, busy, bidRange, bid, selectedCard, dispatch }: Props) {
  const isPlayEnabled = () => {
    if (playerView.playerNumber !== playerView.currentPlayerNumber || busy) {
      return false
    } else {
      return Boolean(
        playerView.phase === HandPhase.Play && selectedCard && canPlayCard(playerView, selectedCard)
      )
    }
  }

  const playEnabled = isPlayEnabled()

  const playCard = (card: Card) => {
    if (canPlayCard(playerView, card)) {
      dispatch({ type: gamePlay, payload: card })
    }
  }

  const playButtonProps = {
    className: 'button is-primary',
    disabled: !playEnabled,
    ...playEnabled
      ? {
          onClick: () => { playCard(selectedCard!) }
        }
      : {}
  }

  return (
    <div className='column is-half current-player'>
      <div className='card'>
        <PlayerHeader playerView={playerView} busy={busy} playerNumber={playerView.playerNumber} />
        <div className='card-content'>
          <Hand playerView={playerView} selectedCard={selectedCard} playCard={playCard} dispatch={dispatch} />
          <div className='buttons'>
            {
              playerView.phase === HandPhase.Bidding
                ? <BidButtons
                    playerView={playerView} busy={busy}
                    bidRange={bidRange} bid={bid} dispatch={dispatch}
                  />
                : <button {...playButtonProps}>
                    Play
                  </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

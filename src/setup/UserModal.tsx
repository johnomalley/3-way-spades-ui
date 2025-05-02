import { createAppSelector, useAppSelector } from '../store/createStore'
import React, { useEffect } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { gameStatsGet } from '../game-stats/gameStatsActions'
import UserSummary from './UserSummary'
import WaitSpinner from '../common/WaitSpinner'
import SuitSymbol from '../common/SuitSymbol'
import { Suit } from '../common/commonTypes'

const selectProps = createAppSelector(
  [
    _ => _.setup.credentials,
    _ => _.setup.players,
    _ => _.gameStats.summary,
  ],
  (credentials, players, summary) => ({
    playerId: credentials.playerId,
    players,
    summary,
  })
)

type Props = Readonly<{
  open: boolean
  onClose: () => void
}>

export default function UserModal({ open, onClose }: Props) {
  const { playerId, players, summary } = useAppSelector(selectProps)

  const player = players[playerId]

  const dispatch = useDispatch()

  useEffect(() => {
    if (open) {
      dispatch({ type: gameStatsGet })
    }
  }, [dispatch, open])

  return (
    <div className={classNames('modal', { 'is-active': open })}>
      <div className='modal-background' onClick={onClose} />
      <div className='modal-card'>
        <header className="modal-card-head">
          <SuitSymbol suit={Suit.Spades} className='is-size-3 mr-2 mb-1' />
          <p className="modal-card-title">{player.displayName}</p>
          <button className='delete' onClick={onClose} />
        </header>
        <section className="modal-card-body">
          {summary ? <UserSummary player={player} players={players} summary={summary}/> : <WaitSpinner />}
        </section>
      </div>
    </div>
  )
}

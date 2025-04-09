import React, { useEffect } from 'react'
import GameList from './game-list/GameList'
import { useDispatch } from 'react-redux'
import { type State } from './store/storeTypes'
import { gameListGet } from './game-list/gameListActions'
import WaitSpinner from './common/WaitSpinner'
import { gameStatsGet } from './game-stats/gameStatsActions'
import RecentGames from './game-stats/RecentGames'
import { useAppSelector } from './store/createStore'
import ErrorOverlay from './common/ErrorOverlay'
import LeaderBoard from './game-stats/LeaderBoard'
import { push } from 'redux-first-history'

export const selectProps = ({ setup, gameList, gameStats }: State) => ({
  games: gameList.games,
  busy: Boolean(gameList.busy || !gameStats.summary),
  error: gameList.error ?? gameStats.error,
  summary: gameStats.summary,
  setupStatus: setup.status,
  players: setup.players
})

export default function HomePage () {
  const {
    games,
    busy,
    error,
    summary,
    setupStatus,
    players
  } = useAppSelector(selectProps)

  const dispatch = useDispatch()

  useEffect(() => {
    if (setupStatus === 'invalid') {
      dispatch(push('/setup'))
    } else if (setupStatus === 'initialized') {
      dispatch({ type: gameListGet })
      dispatch({ type: gameStatsGet })
    }
  }, [dispatch, setupStatus])

  return (
      <div className='home p-4'>
        {
          error
            ? <ErrorOverlay error={error} />
            : (
              <>
                <div className='left-panel p-2'>
                  <div className='pb-4'>
                    {busy ? <WaitSpinner className='pt-4' /> : <GameList games={games} />}
                  </div>
                  {summary && <LeaderBoard summary={summary} players={players} />}
                </div>
                <div className='right-panel'>
                  {summary && <RecentGames summary={summary} players={players} />}
                </div>
              </>
              )
        }
      </div>
  )
}

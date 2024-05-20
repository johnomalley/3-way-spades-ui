import React, { useEffect } from 'react'
import GameList from './game-list/GameList'
import { useDispatch } from 'react-redux'
import { type State } from './store/storeTypes'
import { gameListGet } from './game-list/gameListActions'
import WaitSpinner from './common/WaitSpinner'
import { gameStatsGet } from './game-stats/gameStatsActions'
import RecentGames from './game-stats/RecentGames'
import { useAppSelector } from './store/createStore'
import { push } from 'connected-react-router'
import ErrorOverlay from './common/ErrorOverlay'
import LeaderBoard from './game-stats/LeaderBoard'

export const selectProps = ({ setup: { credentialsValid }, gameList, gameStats }: State) => ({
  games: gameList.games,
  busy: Boolean(gameList.busy || !gameStats.summary),
  error: gameList.error ?? gameStats.error,
  summary: gameStats.summary,
  credentialsValid
})

export default function HomePage () {
  const {
    games,
    busy,
    error,
    summary,
    credentialsValid
  } = useAppSelector(selectProps)

  const dispatch = useDispatch()

  useEffect(() => {
    if (credentialsValid) {
      dispatch({ type: gameListGet })
      dispatch({ type: gameStatsGet })
    } else {
      dispatch(push('/setup'))
    }
  }, [])

  return (
      <div className='home p-4'>
        {
          error
            ? <ErrorOverlay error={error} />
            : (
              <>
                <div className='left-panel p-2'>
                  {
                    busy
                      ? <WaitSpinner />
                      : <GameList games={games} />
                  }
                  {summary && <LeaderBoard summary={summary} />}
                </div>
                <div className='right-panel'>
                  {summary && <RecentGames summary={summary} />}
                </div>
              </>
              )
        }
      </div>
  )
}

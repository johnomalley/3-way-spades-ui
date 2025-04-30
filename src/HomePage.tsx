import React, { useEffect } from 'react'
import GameList from './game-list/GameList'
import { useDispatch } from 'react-redux'
import { gameListGet } from './game-list/gameListActions'
import WaitSpinner from './common/WaitSpinner'
import { gameStatsGet } from './game-stats/gameStatsActions'
import RecentGames from './game-stats/RecentGames'
import { createAppSelector, useAppSelector } from './store/createStore'
import ErrorOverlay from './common/ErrorOverlay'
import LeaderBoard from './game-stats/LeaderBoard'
import { push } from './router/routerActions'

export const selectProps = createAppSelector(
  [
    _ => _.gameList.games,
    _ => _.gameList.busy || !_.gameStats.summary,
    _ => _.gameList.error ?? _.gameStats.error,
    _ => _.gameStats.summary,
    _ => _.setup.status,
    _ => _.setup.players
  ],
  (games, busy, error, summary, setupStatus, players) => ({
    games,
    busy,
    error,
    summary,
    setupStatus,
    players
  })
)

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

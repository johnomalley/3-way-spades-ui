import React, { type ReactNode, type MouseEvent, useMemo, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { Suit } from './common/commonTypes'
import SuitSymbol from './common/SuitSymbol'
import { createAppSelector, useAppSelector } from './store/createStore'
import { isEmpty } from 'lodash'
import UserModal from './setup/UserModal'

type NavbarLinkProps = Readonly<{
  active: boolean
  path: string
  disabled?: boolean
  children: ReactNode
}>

function NavbarLink ({ active, path, disabled, children }: NavbarLinkProps) {
  const onClick = disabled ? (e: MouseEvent<HTMLAnchorElement>) => e.preventDefault() : undefined

  return (
    <Link
      className={classNames('navbar-item', { 'is-active': active })}
      to={path}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

const selectProps = createAppSelector(
  [
    _ => _.setup.status,
    _ => _.setup.credentials,
    _ => _.setup.players,
    _ => _.router.path
  ],
(status, credentials, players, path) => ({
  status,
  credentials,
  players,
  path
})
)

export default function Navbar () {
  const { status, credentials, players, path } = useAppSelector(selectProps)
  const isNavDisabled = status === 'invalid' || isEmpty(credentials.apiKey) || isEmpty(credentials.playerId)

  const [userModalOpen, setUserModalOpen] = useState(false)

  const onOpenUserModal = useCallback(() => {
    setUserModalOpen(true)
  }, [setUserModalOpen])

  const onCloseUserModal = useCallback(() => {
    setUserModalOpen(false)
  }, [setUserModalOpen])

  const player = useMemo(() => players[credentials.playerId], [players, credentials])

  return (
    <nav className='navbar is-light' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <NavbarLink
          active={path === '/games'}
          path='/games'
          disabled={isNavDisabled}
        >
          <SuitSymbol suit={Suit.Spades} className='is-size-4' />
          Home
        </NavbarLink>
        <NavbarLink
          active={path === '/setup'}
          path='/setup'
          disabled={isNavDisabled}
        >
          <i className='fas fa-cog' />
          Setup
        </NavbarLink>
      </div>
      {
        player && (
          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='buttons'>
                <a className='button is-light' onClick={onOpenUserModal}>
                  <i className='fa-solid fa-circle-user mr-2'></i>
                  <span>{player.displayName}</span>
                </a>
              </div>
            </div>
            <UserModal open={userModalOpen} onClose={onCloseUserModal} />
          </div>
        )
      }
    </nav>
  )
}

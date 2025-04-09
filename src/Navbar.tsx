import React, { type ReactNode, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { Suit } from './common/commonTypes'
import SuitSymbol from './common/SuitSymbol'
import type { State } from './store/storeTypes'
import { useAppSelector } from './store/createStore'
import { isEmpty } from 'lodash'

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

const selectProps = ({ router, setup }: State) => ({
  currentPath: router.location?.pathname,
  status: setup.status,
  credentials: setup.credentials
})

export default function Navbar () {
  const { currentPath, status, credentials } = useAppSelector(selectProps)
  const isNavDisabled = status === 'invalid' || isEmpty(credentials.apiKey) || isEmpty(credentials.playerId)
  return (
    <nav className='navbar is-light' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <NavbarLink
          active={currentPath === '/games'}
          path='/games'
          disabled={isNavDisabled}
        >
          <SuitSymbol suit={Suit.Spades} />
          &nbsp;
          Home
        </NavbarLink>
        <NavbarLink
          active={currentPath === '/setup'}
          path='/setup'
          disabled={isNavDisabled}
        >
          <i className='fas fa-cog' />
          &nbsp;
          Setup
        </NavbarLink>
      </div>
    </nav>
  )
}

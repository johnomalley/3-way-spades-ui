import React from 'react'
import { Link } from 'react-router-dom'
import { Suit } from './common/types'
import SuitSymbol from './common/SuitSymbol'
import classNames from 'classnames'

type Props = Readonly<{
  currentPath: string
}>

export default function Navbar ({ currentPath }: Props) {
  return (
    <nav className='navbar is-light' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <Link className={classNames('navbar-item', { 'is-active': currentPath !== '/setup' })} to='/'>
          <SuitSymbol suit={Suit.Spades} />
          &nbsp;
          Play Game
        </Link>
        <Link className={classNames('navbar-item', { 'is-active': currentPath === '/setup' })} to='/setup'>
          <i className='fas fa-cog' />
          &nbsp;
          Setup
        </Link>
      </div>
    </nav>
  )
}

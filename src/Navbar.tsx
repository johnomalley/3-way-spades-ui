import * as React from 'react'
import { Link } from 'react-router-dom'
import { DefaultDispatchProps, Suit } from './common/types'
import SuitSymbol from './common/SuitSymbol'
import classNames = require('classnames')

type StateProps = Readonly<{
  currentPath: string
}>

type Props = StateProps & DefaultDispatchProps

export default class Navbar extends React.PureComponent<Props> {
  render () {
    const { currentPath } = this.props
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
}

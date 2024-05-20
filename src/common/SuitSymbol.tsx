import React from 'react'
import { type Suit } from './commonTypes'
import classNames from 'classnames'

const characters = [0x2666, 0x2663, 0x2665, 0x2660].map(_ => String.fromCharCode(_))

const classes = ['diamonds', 'clubs', 'hearts', 'spades'] as const

type Props = Readonly<{
  suit: Suit
}>

export default function SuitSymbol ({ suit }: Props) {
  return (
    <span className={classNames('suit-icon', classes[suit])}>
      {characters[suit]}
    </span>
  )
}

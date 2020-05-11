import { Dispatch } from 'redux'

export type DefaultDispatchProps = Readonly<{
  dispatch: Dispatch
  push: (path: string) => void
}>

export enum Suit {
  Diamonds = 0,
  Clubs = 1,
  Hearts = 2,
  Spades = 3
}

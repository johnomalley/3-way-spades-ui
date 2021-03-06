import last = require('lodash/last')
import { Suit } from '../common/types'
import nullAction from '../store/nullAction'
import { Action } from '../store/types'
import {
  gameActions,
  gameBid,
  gameError,
  gameGet,
  gamePlay,
  gameScrollBid,
  gameSelectCard,
  gameUpdate,
  gameUpdateBid
} from './actions'

export type Card = Readonly<{
  suit: Suit
  rank: number
}>

export type Trick = Readonly<{
  leader: number
  winner?: number
  cards: ReadonlyArray<Card>
}>

export enum HandPhase {
  Bidding = 0,
  Play = 1,
  Complete = 2
}

export type PlayerView = Readonly<{
  gameId: string
  startTime: string
  endTime?: string
  timestamp: number
  playerNumber: number
  phase: HandPhase
  currentPlayerNumber: number
  players: ReadonlyArray<Readonly<{
    name: string
    points: number
    pointsPerHand: ReadonlyArray<number>
    bid?: number
    trickCount: number
  }>>
  cardsInHand: ReadonlyArray<Card>
  cardsPlayed: ReadonlyArray<Card>
  tricks: ReadonlyArray<Trick>
}>


export type BidRange = Readonly<{
  min: number
  max: number
}>

const defaultBidRange: BidRange = {
  min: 2,
  max: 7
}

export type GameState = Readonly<{
  playerView?: PlayerView
  bid?: number
  bidRange: BidRange
  selectedCard?: Card
  busy: boolean
  error?: Error
}>

export type GameActionType = typeof gameActions[number]

const initialState: GameState = {
  bidRange: defaultBidRange,
  busy: false
}

const scrollBidRange = ({  min, max }: BidRange, delta: number) => ({
  min: min + delta,
  max: max + delta
})

const addCardToTrick = (playerView: PlayerView, card: Card): PlayerView => {
  const { tricks } = playerView
  const lastTrick = last(tricks)
  if (lastTrick && lastTrick.cards.length < 3) {
    const cards = [...lastTrick.cards, card]
    return {
      ...playerView,
      tricks: [...tricks.slice(0, tricks.length - 1), { ...lastTrick, cards }]
    }
  } else {
    return playerView
  }
}

export default (state: GameState = initialState, action: Action = nullAction) => {
  switch (action.type) {
    case gameGet:
      return {
        ...state,
        playerView: undefined,
        error: undefined
      }
    case gameSelectCard:
      return {
        ...state,
        selectedCard: action.payload
      }
    case gameUpdate:
      return {
        ...state,
        playerView: action.payload,
        busy: false
      }
    case gameUpdateBid:
      return {
        ...state,
        bid: action.payload
      }
    case gameScrollBid:
      return {
        ...state,
        bidRange: scrollBidRange(state.bidRange, action.payload)
      }
    case gameBid:
      return {
        ...state,
        busy: true
      }
    case gamePlay:
      return {
        ...state,
        busy: true,
        selectedCard: undefined,
        playerView: addCardToTrick(state.playerView!, state.selectedCard!)
      }
    case gameError:
      return {
        ...state,
        busy: false,
        error: action.payload
      }
    default:
      return state
  }
}

import { type Suit } from '../common/types'
import nullAction from '../store/nullAction'
import { type Action } from '../store/types'
import {
  type gameActions,
  gameBid,
  gameError,
  gameGet,
  gamePlay,
  gameScrollBid,
  gameSelectCard,
  gameUpdate,
  gameUpdateBid
} from './gameActions'
import last from 'lodash/last'

export type Card = Readonly<{
  suit: Suit
  rank: number
}>

export type Trick = Readonly<{
  leader: number
  winner?: number
  cards: readonly Card[]
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
    pointsPerHand: readonly number[]
    bid?: number
    trickCount: number
  }>>
  cardsVisible: boolean
  cardsInHand: readonly Card[]
  cardsPlayed: readonly Card[]
  cardsPlayable: readonly Card[]
  tricks: readonly Trick[]
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

const scrollBidRange = ({ min, max }: BidRange, delta: number) => ({
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

// use the same objects for cardsPlayable so that we can just use object identity to see if a card is playable
const withCardsPlayable = (playerView: PlayerView): PlayerView => playerView.cardsPlayable.length === 0
  ? playerView
  : {
      ...playerView,
      cardsPlayable: playerView.cardsInHand.filter(
        c => playerView.cardsPlayable.some(_ => _.suit === c.suit && _.rank === c.rank)
      )
    }

const maybeSelectCard = (gameState: GameState): GameState =>
  gameState.playerView!.cardsPlayable.length === 1 ? { ...gameState, selectedCard: gameState.playerView!.cardsPlayable[0] } : gameState

export default (state: GameState = initialState, action: Action<unknown> = nullAction) => {
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
      return maybeSelectCard({
        ...state,
        playerView: withCardsPlayable(action.payload as PlayerView),
        busy: false
      })
    case gameUpdateBid:
      return {
        ...state,
        bid: action.payload
      }
    case gameScrollBid:
      return {
        ...state,
        bidRange: scrollBidRange(state.bidRange, action.payload as number)
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

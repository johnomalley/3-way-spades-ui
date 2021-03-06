import * as React from 'react'
import { Card as CardType } from './gameReducer'
import Card from './Card'

type Props = Readonly<{
  side?: 'left' | 'right'
  playerName?: string
  card?: CardType
}>


export default class PlayAreaCard extends React.PureComponent<Props> {
  render (): React.ReactNode {
    const { side, playerName, card } = this.props
    const playerNameNode = playerName ? (
      <div className='player-name'>
        {playerName}
      </div>
    ): undefined
    const cardNode = card ? (
      <Card card={card} selected={false}/>
    ) : (
      <div className='playing-card'/>
    )

    return (
      <div className='level-item'>
        {
          side === 'left' ? cardNode : playerNameNode
        }
        {
          side === 'left' ? playerNameNode : cardNode
        }
      </div>
    )
  }
}

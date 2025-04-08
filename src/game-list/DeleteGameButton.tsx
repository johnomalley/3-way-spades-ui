import React from 'react'
import { useDispatch } from 'react-redux'
import { gameListDelete } from './gameListActions'

type Props = Readonly<{
  gameId: string
  deleteGameId?: string
}>

export default function DeleteGameButton ({ gameId, deleteGameId }: Props) {
  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch({ type: gameListDelete, payload: gameId })
  }

  return (
    <button
      className='button is-small ml-2'
      title='Delete game'
      onClick={onDelete}
      disabled={Boolean(deleteGameId)}
    >
      <i className='fa-solid fa-trash'/>
    </button>
  )
}

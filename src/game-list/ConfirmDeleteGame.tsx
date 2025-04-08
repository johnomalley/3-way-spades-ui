import React from 'react'
import { useDispatch } from 'react-redux'
import { gameListClearDeletedGame, gameListConfirmDelete } from './gameListActions'

type Props = Readonly<{
  gameId: string
}>

export default function ConfirmDeleteGame ({ gameId }: Props) {
  const dispatch = useDispatch()

  const onConfirmDelete = () => {
    dispatch({ type: gameListConfirmDelete, payload: gameId })
  }

  const onCancelDelete = () => {
    dispatch({ type: gameListClearDeletedGame, payload: gameId })
  }

  return (
    <>
      <button className='button is-small is-danger ml-2' onClick={onConfirmDelete}>
        Delete Game
      </button>
      <button className='button is-small ml-2' onClick={onCancelDelete}>
        Cancel
      </button>
    </>
  )
}

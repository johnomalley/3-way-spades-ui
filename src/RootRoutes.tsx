import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import SetupPage from './setup/SetupPage'
import HomePage from './HomePage'
import GamePage from './game/GamePage'

export default function RootRoutes () {
  return (
    <Routes>
      <Route path='/setup' element={<SetupPage />} />
      <Route path='/games/:id' element={<GamePage />} />
      <Route path='/games' element={<HomePage />} />
      <Route path='/' element={<Navigate replace to='/games' />} />
    </Routes>
  )
}

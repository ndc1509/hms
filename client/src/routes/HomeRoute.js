import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import FloorPlan from '../components/rooms/FloorPlan'
import { authSelector } from '../store/reducers/authSlice'
const HomeRoute = () => {
  const auth = useSelector(authSelector)
  const location = useLocation()
  if(!auth.user)
    return (
      <Navigate to='/' state={{from: location}} replace/>
    )
  return <FloorPlan/>
}

export default HomeRoute
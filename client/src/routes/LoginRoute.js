import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Login from '../components/login/Login'
import { authSelector } from '../store/reducers/authSlice'

const LoginRoute = () => {
  const auth = useSelector(authSelector)
  if (auth.user)
    return <Navigate to="/home" replace/>
  else return <Login/>
}

export default LoginRoute
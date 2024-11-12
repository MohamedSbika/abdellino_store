import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  const { currentUser } = useSelector((state) => state.user)

  // Vérifiez si l'utilisateur est connecté et s'il a le rôle 'admin'
  return currentUser && currentUser.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  )
}

export default AdminRoute

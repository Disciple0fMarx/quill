// src/components/ProtectedRoute.tsx
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { accessToken } = useAuth()
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />
}

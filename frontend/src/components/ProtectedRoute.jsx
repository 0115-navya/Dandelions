// src/components/ProtectedRoute.jsx
// Wraps pages that require login — redirects to /login if not authenticated

import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../features/auth/authSlice'
import toast from 'react-hot-toast'

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  if (!isLoggedIn) {
    toast.error('Please login to continue')
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute

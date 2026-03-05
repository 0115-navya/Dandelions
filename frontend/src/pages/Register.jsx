// src/pages/Register.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  registerUser,
  selectAuthLoading,
  selectAuthError,
  selectIsLoggedIn,
  clearError,
} from '../features/auth/authSlice'
import toast from 'react-hot-toast'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn, navigate])

  useEffect(() => {
    return () => dispatch(clearError())
  }, [dispatch])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setValidationError('')
  }

  const validate = () => {
    // Password regex from your original login.html validation!
    const strongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    if (!strongPassword.test(form.password)) {
      return 'Password must be 8-15 chars with uppercase, lowercase, number & special character'
    }
    if (form.password !== form.confirm) {
      return 'Passwords do not match'
    }
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    if (err) {
      setValidationError(err)
      return
    }

    dispatch(registerUser({ name: form.name, email: form.email, password: form.password }))
      .unwrap()
      .then(() => {
        toast.success('Account created! Welcome to Dandelions 🌸')
        navigate('/')
      })
      .catch(() => {})
  }

  const displayError = validationError || error

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="auth-subtitle">Join the Dandelions family 🌸</p>

        {displayError && <div className="auth-error">⚠️ {displayError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min 8 chars, 1 upper, 1 special"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Repeat your password"
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? '⏳ Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  )
}

export default Register

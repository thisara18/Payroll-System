import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState({})
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    
    // Real-time validation for better UX
    if (touched[name]) {
      validateField(name, value)
    }
  }

  const handleInputBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    validateField(name, value)
  }

  const validateField = (name, value) => {
    const newErrors = { ...errors }
    
    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Please enter a valid email'
        } else {
          delete newErrors.email
        }
        break
      
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required'
        } else if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters'
        } else {
          delete newErrors.password
        }
        break
      
      case 'fullName':
        if (!isLogin && !value) {
          newErrors.fullName = 'Full name is required'
        } else if (!isLogin && value.length < 2) {
          newErrors.fullName = 'Full name must be at least 2 characters'
        } else {
          delete newErrors.fullName
        }
        break
      
      case 'confirmPassword':
        if (!isLogin) {
          if (!value) {
            newErrors.confirmPassword = 'Please confirm your password'
          } else if (value !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match'
          } else {
            delete newErrors.confirmPassword
          }
        }
        break
      
      default:
        break
    }
    
    setErrors(newErrors)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (!isLogin) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required'
      } else if (formData.fullName.length < 2) {
        newErrors.fullName = 'Full name must be at least 2 characters'
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({ email: '', password: '', confirmPassword: '', fullName: '' })
    setErrors({})
    setTouched({})
    setShowPassword(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Mark all fields as touched for validation display
    const allFields = isLogin 
      ? ['email', 'password'] 
      : ['email', 'password', 'confirmPassword', 'fullName']
    
    const newTouched = {}
    allFields.forEach(field => { newTouched[field] = true })
    setTouched(newTouched)
    
    if (!validateForm()) return

    setLoading(true)
    try {
      if (isLogin) {
        // --- LOGIN CALL ---
        const res = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        })

        const data = await res.json()
        if (!res.ok) {
          setErrors({ general: data.error || 'Login failed' })
        } else {
          // Save token & role
          localStorage.setItem('token', data.token)
          localStorage.setItem('role', data.role)
          alert('Login successful! Welcome back.')
          navigate('/employee') // redirect to employee page
        }
      } else {
        // --- SIGNUP CALL ---
        const res = await fetch('http://localhost:8080/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            password: formData.password
          })
        })

        if (res.ok) {
          alert('Account created successfully! Please login.')
          setIsLogin(true)
          resetForm()
        } else {
          const data = await res.text()
          setErrors({ general: data || 'Signup failed' })
        }
      }
    } catch (err) {
      console.error(err)
      setErrors({ general: 'Something went wrong. Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    resetForm()
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/95 rounded-3xl p-12 shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">PayrollPro</h1>
          <p className="text-gray-600">
            {isLogin ? 'Welcome back!' : 'Join our team!'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* General Error Display */}
          {errors.general && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              {errors.general}
            </div>
          )}

          {!isLogin && (
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {!isLogin && (
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-medium transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500'
            } text-white`}
          >
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-6">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button 
                onClick={toggleMode} 
                className="text-indigo-600 underline hover:text-indigo-800"
                disabled={loading}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button 
                onClick={toggleMode} 
                className="text-indigo-600 underline hover:text-indigo-800"
                disabled={loading}
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login

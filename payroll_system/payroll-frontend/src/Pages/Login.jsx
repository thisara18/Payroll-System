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
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      if (isLogin) {
        // Handle login logic
        console.log('Login:', { email: formData.email, password: formData.password })
        // Navigate to dashboard after successful login
        navigate('/dashboard')
      } else {
        // Handle signup logic
        console.log('Signup:', formData)
        // After successful signup, switch to login or navigate to dashboard
        setIsLogin(true)
        setFormData({ email: '', password: '', confirmPassword: '', fullName: '' })
        alert('Account created successfully! Please login.')
      }
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({ email: '', password: '', confirmPassword: '', fullName: '' })
    setErrors({})
    setShowPassword(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-48 h-48 bg-white/10 rounded-full animate-float opacity-20"></div>
        <div className="absolute top-[60%] right-[15%] w-36 h-36 bg-white/10 rounded-full animate-float-delay-2 opacity-20"></div>
        <div className="absolute bottom-[20%] left-[20%] w-24 h-24 bg-white/10 rounded-full animate-float-delay-4 opacity-20"></div>
      </div>
      
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-12 shadow-2xl w-full max-w-md relative z-10 transform transition-all duration-500 hover:scale-105">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">💼</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PayrollPro
            </span>
          </div>
          <p className="text-gray-600 text-lg">
            {isLogin ? 'Welcome back!' : 'Join our team!'}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-8 relative">
          <button 
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 relative z-10 ${
              isLogin 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 relative z-10 ${
              !isLogin 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
                  errors.fullName 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
                    : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
              {errors.fullName && <span className="text-red-500 text-sm block mt-2">{errors.fullName}</span>}
            </div>
          )}

          <div className="space-y-2">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
                  : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
            {errors.email && <span className="text-red-500 text-sm block mt-2">{errors.email}</span>}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 pr-12 border-2 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
                  errors.password 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
                    : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-sm block mt-2">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
                  errors.confirmPassword 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
                    : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm block mt-2">{errors.confirmPassword}</span>}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-8 rounded-xl text-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 mt-8"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              className="text-indigo-600 font-semibold hover:text-purple-600 underline transition-colors duration-300"
              onClick={toggleMode}
            >
              {isLogin ? 'Sign up here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

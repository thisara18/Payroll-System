import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

// Placeholder Dashboard component - you can replace this with your actual dashboard
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-8">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-6">🎉 Welcome to PayrollPro Dashboard!</h1>
        <p className="text-2xl mb-8 opacity-90">You have successfully logged in.</p>
        <button 
          onClick={() => window.location.href = '/login'}
          className="px-8 py-4 bg-white/20 border-2 border-white rounded-xl text-white font-semibold text-lg hover:bg-white/30 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}


export default App

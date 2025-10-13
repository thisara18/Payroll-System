import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Employee from './Pages/Employee/Employee'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if token is expired
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    if (payload.exp < currentTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userName');
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Dashboard component with logout functionality
const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.clear();
    window.location.href = '/login';
  };

  const testProtection = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    window.location.href = '/employee';
  };

  const role = localStorage.getItem('role');
  const userName = localStorage.getItem('userName') || 'User';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-8">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-6">🎉 Welcome to PayrollPro Dashboard!</h1>
        <p className="text-2xl mb-8 opacity-90">Hello {userName}! You have successfully logged in as {role}.</p>
        <div className="space-x-4 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => window.location.href = '/employee'}
            className="px-8 py-4 bg-white/20 border-2 border-white rounded-xl text-white font-semibold text-lg hover:bg-white/30 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            Go to Employee Management
          </button>
          <button 
            onClick={testProtection}
            className="px-8 py-4 bg-yellow-500/80 border-2 border-white rounded-xl text-white font-semibold text-lg hover:bg-yellow-600/80 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            Test Protection
          </button>
          <button 
            onClick={handleLogout}
            className="px-8 py-4 bg-red-500/80 border-2 border-white rounded-xl text-white font-semibold text-lg hover:bg-red-600/80 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            Logout
          </button>
        </div>
        
        {/* Debug info */}
        <div className="mt-8 p-4 bg-black/20 rounded-lg text-sm">
          <h3 className="font-bold mb-2">Debug Info:</h3>
          <p>Token: {localStorage.getItem('token') ? 'Present' : 'Missing'}</p>
          <p>Role: {localStorage.getItem('role') || 'Not set'}</p>
          <p>User: {localStorage.getItem('userName') || 'Not set'}</p>
        </div>
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
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/employee" element={
            <ProtectedRoute>
              <Employee />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
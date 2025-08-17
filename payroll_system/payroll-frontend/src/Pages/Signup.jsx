import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    // Redirect to login page since we handle both login and signup there
    navigate('/login')
  }, [navigate])

  return null
}

export default Signup

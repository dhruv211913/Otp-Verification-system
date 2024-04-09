import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dash = () => {
  const navigate = useNavigate();

  const userValid = () => {
    let token = localStorage.getItem('usertoken');
    if (token) {
      console.log("User Valid")
    }
    else {
      navigate('*')
    }
  }
  useEffect(() => {
    userValid()
  }, [])
  return (
    <div>dashboard</div>  
  )
}

export default Dash;
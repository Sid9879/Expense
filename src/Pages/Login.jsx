import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  let emailRef = useRef()
  let passwordRef = useRef()
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let obj = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    let res = await axios.post(`https://expense-backend-ol96.onrender.com/api/users/login`, obj);
  

    if (res.data.success) {
      localStorage.setItem('expenseLogin', JSON.stringify(res.data.user))
      props.setlogin(true);
      navigate('/')
    } else {
      alert(res.data.msg)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='w-full max-w-md bg-white shadow-md rounded-lg p-6'>
        <h1 className='text-2xl font-bold text-center mb-6'>Login</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
            <input ref={emailRef} type="email" id="email" className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="name@example.com" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Your Password</label>
            <input ref={passwordRef} type="password" id="password" className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <button onClick={handleSubmit} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2.5 text-center">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login;

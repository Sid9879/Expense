import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  let nameRef = useRef()
  let emailRef = useRef()
  let passwordRef = useRef()

  let navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    let obj = {
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value
    }
    console.log(obj)

    let res = await fetch('http://localhost:8080/api/users/create',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(obj)
    })
let data = await res.json()
console.log(data)

if(data.success){
navigate('/login')
}
else{
  alert(data.msg)
}
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-center text-gray-900 mb-4'>Signup</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input ref={nameRef} type="text" id="name" className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Enter Your Name" required />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
            <input ref={emailRef} type="email" id="email" className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="name@example.com" required />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Your Password</label>
            <input ref={passwordRef} type="password" id="password" className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          
          <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Signup

'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { register, reset } from '../store/authSlice'

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })

  const { username, email, password, password2 } = formData

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  
  const router = useRouter()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError && message) {
      console.error(message)
    }
    if (isSuccess && user) {
      router.push('/dashboard')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, router, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

    // Reset errors on change
    if (e.target.name === 'email') {
      setEmailError('')
    }
    if (e.target.name === 'password' || e.target.name === 'password2') {
      setPasswordError('')
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long')
      return
    }

    if (password !== password2) {
      setPasswordError('Passwords do not match')
    } else if (!validateEmail(email)) {
      setEmailError('Please add a valid email')
    } else {
      const userData = {
        username,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h1>
        {message && (
          <div className={`p-4 mb-4 text-sm rounded-lg ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`} role="alert">
            {message}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              className="w-full rounded-lg border-gray-300 p-3 text-base shadow-sm transition hover:shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="username"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={onChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              className={`w-full rounded-lg ${emailError ? 'border-red-500' : 'border-gray-300'} p-3 text-base shadow-sm transition hover:shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              className={`w-full rounded-lg ${passwordError ? 'border-red-500' : 'border-gray-300'} p-3 text-base shadow-sm transition hover:shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              className={`w-full rounded-lg ${passwordError ? 'border-red-500' : 'border-gray-300'} p-3 text-base shadow-sm transition hover:shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
              required
            />
            {passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
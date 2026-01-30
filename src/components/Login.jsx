'use client'
import React, { useState } from 'react'
import { Fugaz_One } from 'next/font/google';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setpPassword] = useState('')
  const [authenticating, setAuthenticating] = useState(false)
  
  const [error, setError] = useState(null)

  const { signup, login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const [isRegister, setIsRegister] = useState(mode === 'register')

  function handleUpdateForm(e, setter) {
    setter(e.target.value)
    if (error) setError(null)
  }

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      setError('Please fill out all fields (password must be 6+ chars)')
      return
    }
    
    setAuthenticating(true)
    setError(null)

    try {
      if (isRegister) {
        console.log('Signing up a new user')
        await signup(email, password)
      } else {
        console.log('Logging in existing user')
        await login(email, password)
      }

      router.push('/dashboard')
    } catch (err) {
      console.log(err.code)
      
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Try logging in instead.')
          break;
        case 'auth/invalid-email':
          setError('The email address is invalid.')
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Incorrect email or password.')
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.')
          break;
        default:
          setError('Something went wrong. Please try again.')
          break;
      }
    } finally {
      setAuthenticating(false)
    }
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={`text-4xl sm:text-5xl md:text-6xl ${fugaz.className}`}>{isRegister ? 'Register' : 'Log In'}</h3>
      <p>You're one step away!</p>
      
      <Input placeholder='Email' value={email} onChange={(e) => handleUpdateForm(e, setEmail)} type='email' />
      <Input placeholder='Password' value={password} onChange={(e) => handleUpdateForm(e, setpPassword)} type='password' />
      
      {error && (
        <div className='max-w-[400px] w-full text-center'>
            <p className='text-rose-500 text-sm font-semibold'>{error}</p>
        </div>
      )}

      <div className='max-w-[25rem] w-full mx-auto'>
        <Button clickHandler={handleSubmit} text={authenticating ? "Submitting" : "Submit"} full/>
      </div>
      
      <p className='text-center'>{isRegister ? 'Already have an account? ' : 'Don\'t have an account? '}
      <button 
        onClick={() => {
            setIsRegister(!isRegister)
            setError(null)
        }}
        className='text-indigo-600 underline cursor-pointer'>{isRegister ? 'Sign In' : 'Sign Up'}
      </button></p>
    </div>
  )
}
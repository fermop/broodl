'use client'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa6"; 

export default function Input(props) {
  const { placeholder, value, onChange, type } = props
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : (type || 'text')

  return (
    <div className='w-full max-w-[400px] mx-auto relative'>
      <input 
        className='w-full px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-0 focus:border-indigo-600 hover:border-indigo-600 duration-200 pr-10'
        type={inputType} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
      />

      {isPassword && (
        <button 
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-600 cursor-pointer duration-200'
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  )
}
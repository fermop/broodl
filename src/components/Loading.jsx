import React from 'react'
import { BiLoaderCircle } from "react-icons/bi";

export default function Loading() {
  return (
    <div className='flex flex-col flex-1 justify-center items-center'>
      <BiLoaderCircle className='text-slate-800 animate-spin text-4xl sm:text-5xl'/>
    </div>
  )
}

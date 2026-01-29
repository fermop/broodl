'use client'
import React from 'react'
import Link from 'next/link';
import Button from "@/components/Button";
import { useAuth } from '@/context/AuthContext';

export default function CallToAction() {
    const { currentUser } = useAuth()

    if (currentUser) {
        return (
            <div className='max-w-[37.5rem] mx-auto w-full'>
                <Link href={'/dashboard'}>
                    <Button full dark text="Go to dashboard"/>
                </Link>
            </div>
        )
    }

  return (
    <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
        <Link href={'/dashboard'}>
          <Button text="Sign Up"/>
        </Link>
        <Link href={'/dashboard'}>
          <Button text="Log in" dark/>
        </Link>
      </div>
  )
}

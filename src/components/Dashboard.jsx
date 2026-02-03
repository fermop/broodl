'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { Fugaz_One } from 'next/font/google';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import Calendar from '@/components/Calendar';
import { useAuth } from '@/context/AuthContext';
import Loading from "@/components/Loading";
import { useStats } from '@/hooks/useStats';
import { useRouter } from 'next/navigation';
import { moods } from '@/utils';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth()
  const [data, setData] = useState({})
  const now = new Date()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/')
    }
  }, [currentUser, loading, router])

  const stats = useStats(data)

    const statuses = {
    ...stats,
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`
  }

  async function handleSetMood(mood) {
    let day = now.getDate()
    let month = now.getMonth()
    let year = now.getFullYear()
    
    try {
      const newData = {...userDataObj }
      if (!newData?.[year]) {
        newData[year] = {}
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {}
      }
      newData[year][month][day] = mood
      // Update current state
      setData(newData)
  
      // Update global state
      setUserDataObj(newData)
      
      // Update firebase
      const docRef = doc(db, 'users', currentUser.uid)
      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: mood
          }
        }
      }, {merge: true})
    } catch (err) {
      console.log('Failed to set data: ', err.message)
    }
  }

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return
    }
    setData(userDataObj)
  }, [currentUser, userDataObj])

  if (loading) {
    return <Loading />
  }

  if (!currentUser) {
      return null 
  }

  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
      <div className='grid sm:grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4'>
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className='flex flex-col gap-1 sm:gap-2 text-center'>
              <p className='font-medium text-xs sm:text-sm truncate capitalize'>{status.replaceAll('_', ' ')}</p>
              <p className={`text-base sm:text-lg truncate ${fugaz.className}`}>{statuses[status]}{status === 'num_days' ? ' 🔥' : ''}</p>
            </div>
          )
        })}
      </div>
      <h4 className={`text-5xl sm:text-6xl md:text-7xl text-center ${fugaz.className}`}>
        How do you <span className='textGradient'>feel</span> today?
      </h4>
      <div className='flex items-stretch flex-wrap gap-4'>
        {Object.keys(moods).map((moodIndex) => {
          const mood = moods[moodIndex]
          return (
            <button onClick={() => {
              handleSetMood(Number(moodIndex))
            }} className={`p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 cursor-pointer text-center flex flex-col itemx-center gap-2 flex-1`} key={moodIndex}>
              <p className='text-4xl sm:text-5xl md:text-6xl'>{mood.emoji}</p>
              <p className={`text-indigo-500 text-xs sm:text-sm md:text-base ${fugaz.className}`}>{mood.label}</p>
            </button>
          )
        })}
      </div>
      <Suspense fallback={<Loading />}>
        <Calendar completeData={data} handleSetMood={handleSetMood}/>
      </Suspense>
    </div>
  )
}

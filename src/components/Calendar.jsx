'use client'
import React from 'react'
import { baseRating, gradients, moods } from '@/utils'
import { Fugaz_One } from 'next/font/google'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Calendar(props) {
  const { demo, completeData } = props
  const now = new Date()
  
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const currMonth = now.getMonth()
  const currYear = now.getFullYear()
  
  const selectedMonthIndex = searchParams.get('month') ? Number(searchParams.get('month')) : currMonth
  const selectedYear = searchParams.get('year') ? Number(searchParams.get('year')) : currYear

  const selectedMonth = monthsArr[selectedMonthIndex]
  const data = completeData?.[selectedYear]?.[selectedMonthIndex] || {}

  function handleIncrementMonth(val) {
    let newMonthIndex = selectedMonthIndex + val
    let newYear = selectedYear
    
    if (newMonthIndex < 0) {
      newYear = selectedYear - 1
      newMonthIndex = 11
    } else if (newMonthIndex > 11) {
      newYear = selectedYear + 1
      newMonthIndex = 0
    }

    const params = new URLSearchParams(searchParams)
    params.set('month', newMonthIndex.toString())
    params.set('year', newYear.toString())
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const monthNow = new Date(selectedYear, selectedMonthIndex, 1)
  const firstDayOfMonth = monthNow.getDay()
  const daysInMonth = new Date(selectedYear, selectedMonthIndex + 1, 0).getDate()

  const daysToDisplay = firstDayOfMonth + daysInMonth
  const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-5 gap-4'>
        <button onClick={() => handleIncrementMonth(-1)} className='mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60 cursor-pointer'>
          <FaCircleChevronLeft />
        </button>
        <p className={`text-center col-span-3 capitalize whitespace-nowrap textGradient ${fugaz.className}`}>
            {selectedMonth}, {selectedYear}
        </p>
        <button onClick={() => handleIncrementMonth(1)} className='ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60 cursor-pointer'>
          <FaCircleChevronRight />
        </button>
      </div>

      <div className='flex flex-col overflow-hidden gap-1 p-4 sm:py-6 md:py-10'>
        {[...Array(numRows).keys()].map((row, rowIndex) => {
          return (
            <div key={rowIndex} className='grid grid-cols-7 gap-1'>
              {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)
                
                const isBeforeStart = row === 0 && dayOfWeekIndex < firstDayOfMonth
                const isAfterEnd = dayIndex > daysInMonth
                const dayDisplay = !isBeforeStart && !isAfterEnd
                
                const isToday = dayIndex === now.getDate() && selectedMonthIndex === now.getMonth() && selectedYear === now.getFullYear()

                if (!dayDisplay) {
                  return <div className='bg-white' key={dayOfWeekIndex}></div>
                }

                let color = 'white'
                let dayEmoji = null

                if (demo) {
                    let val = baseRating[dayIndex]
                    color = gradients.indigo[val]
                    dayEmoji = moods[val]?.emoji
                } else if (data && dayIndex in data) {
                    let val = data[dayIndex]
                    color = gradients.indigo[val]
                    dayEmoji = moods[val]?.emoji
                }

                return (
                  <div style={{ background: color }} className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${isToday ? 'border-indigo-400 font-bold' : 'border-indigo-100'} ${color === 'white' ? 'text-indigo-400' : 'text-white'}`} key={dayOfWeekIndex}>
                    <p>{dayIndex}</p>
                    {dayEmoji && <p>{dayEmoji}</p>}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
'use client'
import React, { useState } from 'react'
import { baseRating, gradients } from '@/utils'
import { Fugaz_One } from 'next/font/google'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Calendar(props) {
  const { demo, completeData } = props
  const now = new Date()
  const currMonth = now.getMonth()
  
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(currMonth)
  const [selectedYear, setSelectedYear] = useState(now.getFullYear())

  const selectedMonth = monthsArr[selectedMonthIndex]
  const data = completeData?.[selectedYear]?.[selectedMonthIndex] || {}

  function handleIncrementMonth(val) {
    let newMonthIndex = selectedMonthIndex + val
    
    if (newMonthIndex < 0) {
      setSelectedYear(curr => curr - 1)
      setSelectedMonthIndex(11) // December
    } else if (newMonthIndex > 11) {
      setSelectedYear(curr => curr + 1)
      setSelectedMonthIndex(0) // January
    } else {
      setSelectedMonthIndex(newMonthIndex)
    }
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
            <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <p className={`text-center col-span-3 capitalize whitespace-nowrap textGradient ${fugaz.className}`}>
            {selectedMonth}, {selectedYear}
        </p>
        <button onClick={() => handleIncrementMonth(1)} className='ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60 cursor-pointer'>
            <i className="fa-solid fa-circle-chevron-right"></i>
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
                if (demo) {
                    color = gradients.indigo[baseRating[dayIndex]]
                } else if (data && dayIndex in data) {
                    color = gradients.indigo[data[dayIndex]]
                }

                return (
                  <div style={{ background: color }} className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${isToday ? 'border-indigo-400 font-bold' : 'border-indigo-100'} ${color === 'white' ? 'text-indigo-400' : 'text-white'}`} key={dayOfWeekIndex}>
                    <p>{dayIndex}</p>
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
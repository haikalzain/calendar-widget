'use client'
import {useMemo, useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {addMonthDelta, getDaysInMonth, getNameForMonth, weekDayNames} from "@/components/DatePicker/calendarData";

function MonthHeader({month, year, setPrevMonth, setNextMonth}) {
  return (<div className="flex align-middle justify-around">
    <button onClick={setPrevMonth}><ChevronLeftIcon className="h-6 w-6"/></button>
    <div className="self-center text-sm text-gray-800 font-medium">{getNameForMonth(month)} {year}</div>
    <button onClick={setNextMonth}><ChevronRightIcon className="h-6 w-6"/></button>
  </div>)
}

function calcMonthOffsets(month, year) {
  const [prevMonth, prevMonthYear] = addMonthDelta(month, year, -1)
  const numDays = getDaysInMonth(month, year)
  const numDaysPrev = getDaysInMonth(prevMonth, prevMonthYear)

  const day = new Date(year, month, 1).getDay()
  const monthOffsets = []
  for (let i = 0; i < day; i++) {
    monthOffsets.push({
      date: new Date(year, month - 1, numDaysPrev - day + i + 1),
      monthOffset: -1,
      day: numDaysPrev - day + i + 1
    })
  }
  for (let i = 0; i < numDays; i++) {
    monthOffsets.push({
      date: new Date(year, month, i + 1),
      monthOffset: 0,
      day: i + 1}
    )
  }

  for (let i = 0; i < 42 - day - numDays; i++) {
    monthOffsets.push({
      date: new Date(year, month + 1, i + 1),
      monthOffset: 1,
      day: i + 1}
    )
  }

  return monthOffsets
}

function MonthView({month, year, selectedDate, setSelectedDate, setPrevMonth, setNextMonth}) {
  const monthOffsets = useMemo(() => calcMonthOffsets(month, year),[month, year])

  return (
    <div className="grid grid-cols-7 text-sm justify-items-center gap-y-3">
      {weekDayNames.map(name => <div className="p-1 w-6 h-6 " key={name}>
        {name}
      </div>)}
      {monthOffsets.map(({monthOffset, day, date}, i) =>
        <button onClick={() => {setSelectedDate(date); if(monthOffset === -1) setPrevMonth(); if(monthOffset === 1) setNextMonth()}} key={i}
                className={`rounded flex justify-center items-center p-1 w-6 h-6 
                ${monthOffset === 0 ? "text-gray-800" : "text-gray-300"} 
                ${selectedDate.getTime() === date.getTime() ? "text-gray-100 bg-blue-500": "hover:bg-gray-200"}`}>
          {day}
        </button>)}
    </div>
  )
}

export function DatePicker({}) {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())

  const setPrevMonth = () => {
    const [newMonth, newYear] = addMonthDelta(month, year, -1)
    setMonth(newMonth)
    setYear(newYear)
  }

  const setNextMonth = () => {
    const [newMonth, newYear] = addMonthDelta(month, year, 1)
    setMonth(newMonth)
    setYear(newYear)
  }

  return (
    <div className="m-10 bg-white rounded shadow w-80 p-2">
      <MonthHeader
        setPrevMonth={setPrevMonth}
        setNextMonth={setNextMonth}
        month={month}
        year={year}/>
      <MonthView
        month={month}
        year={year}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setPrevMonth={setPrevMonth}
        setNextMonth={setNextMonth}/>
    </div>
  )
}
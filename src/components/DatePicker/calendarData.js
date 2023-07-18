

const lookupMonthName = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "July",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec"
}

const lookupMonthDays = [
  31,
  28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
]

export const weekDayNames = [
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa"
]


export function getNameForMonth(month) {
  return lookupMonthName[month]
}

export function getNameForWeek(week) {
  return weekDayNames[week]
}

function isLeapYear(year) {
  if(year % 400 === 0) return 1
  if(year % 100) return 0
  if(year % 4) return 1
  return 0
}

export function getDaysInMonth(month, year) {
  return lookupMonthDays[month] + isLeapYear(year)
}

export function addMonthDelta(month, year, delta) {
  // assume |delta| <= 12
  if(month + delta >= 12) {
    return [month + delta - 12, year + 1]
  } else if(month + delta < 0) {
    return [month + delta + 12, year - 1]
  }

  return [month + delta, year]
}

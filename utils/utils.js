import { dayjs } from '@/plugins/dayjs'
import jalaali from 'jalaali-js'

export function toPersianNumber (num) {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  let number = ''
  if (typeof num === 'number') {
    number = num.toString()
  }
  else if (typeof num === 'string') {
    number = num
  }
  else {
    return 'Invalid'
  }

  return number.replace(/\d/g, x => farsiDigits[x])
}

export function datetimeToJalali (value, format) {
  if (!value) return
  return toPersianNumber(dayjs.utc(value).tz('Asia/Tehran').calendar('jalali').locale('fa').format(format))
}

export function datetimeToJalaliEn (value, format) {
  if (!value) return
  return dayjs.utc(value).tz('Asia/Tehran').calendar('jalali').locale('fa').format(format)
}

export function persianToGregorian (persianDateTime, customeTime = null) {
  console.log('persianDateTime', persianDateTime)
  if (persianDateTime) {
    const [persianDate, time] = persianDateTime.split('T')

    const [persianYear, month, day] = persianDate.split('-').map(num => parseInt(num, 10))

    const gregorianYearStart = 2023 + (persianYear - 1402)

    const startOfPersianYearInGregorian = dayjs(`${gregorianYearStart}-03-21`)

    const daysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29] // Days in each month of the Persian calendar
    const dayOfYear = daysInMonth.slice(0, month - 1).reduce((sum, days) => sum + days, 0) + day

    let customeTimeAfter = ''
    if (customeTime) {
      if (customeTime === 'start') {
        customeTimeAfter = '00:00:10.000Z'
      }
      else {
        customeTimeAfter = '23:55:10.000Z'
      }
    }
    else {
      customeTimeAfter = time
    }

    const gregorianDateTime = startOfPersianYearInGregorian.add(dayOfYear, 'day').format('YYYY-MM-DD') + 'T' + customeTimeAfter

    console.log('gregorianDateTime END', gregorianDateTime)
    return gregorianDateTime
  }
  return null
}

function addLeadingZero (number) {
  return number < 10 ? '0' + number : number
}

export function convertToGregorian (date) {
  let time = ''
  if (date) {
    const last = date?.lastIndexOf('Z') > 0 ? date.lastIndexOf(':') : date.length
    time = date.substring(date.indexOf('T') + 1, last)
  }
  else time = dayjs().format('HH:mm')

  const y = +dayjs(date).format('YYYY')
  const m = +dayjs(date).format('MM')
  const d = +dayjs(date).format('DD')
  const gregorian = jalaali.toGregorian(y, m, d)
  if (+dayjs().diff(dayjs(date), 'y') > 620 && +dayjs().diff(dayjs(date), 'y') < 623) { return `${gregorian.gy}-${addLeadingZero(gregorian.gm)}-${addLeadingZero(gregorian.gd)}T${time}` }
  else { return dayjs(date).format('YYYY-MM-DDTHH:mm') }
}

export function seperateNumber (num) {
  let numStr = String(num)

  let result = ''
  while (numStr.length > 3) {
    result = ',' + numStr.slice(-3) + result
    numStr = numStr.slice(0, numStr.length - 3)
  }
  if (numStr) {
    result = numStr + result
  }
  return result
}

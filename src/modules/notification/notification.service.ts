import moment from 'moment'
import ms from 'ms'

const dateFromDb = new Date("2019-12-18")

const myDate = new Date()

const today = new Date().getDate()

const last = moment().subtract('1', 'd').toDate().getDate()

console.log(last - today)

const daysInMs = ms("1 day")
console.log(daysInMs)






import { standardDate } from './../dashboard/dashboard.util';
import moment from 'moment'
import schedule from 'node-schedule'

function getDateDiff(dateFromDb) {
    const today = standardDate().getDate()
    const last = moment(dateFromDb).subtract('1', 'd').toDate().getDate()
    return today === last
}

console.log('dateDiff', getDateDiff(new Date("2019-12-15")))

console.log(new Date("2019-12-17").getDate())

/* 
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    │
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL) 
*/

// Schedules jobs every day at 01:00:10

schedule.scheduleJob('10 0 1 * * *', () => {
    console.log("Hey")
})







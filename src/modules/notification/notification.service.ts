import { standardDate } from './../dashboard/dashboard.util';
import moment from 'moment'
import schedule from 'node-schedule'
import { DashBoardRepo } from '../dashboard/dashboard.repository';

const payment = new DashBoardRepo()

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

const sendNotification = async () => {
    const result = await payment.getAllPayments()
    let length = result.length
    let notifiedUser = 0

    if (!length) {
        return
    }

    while (!(length < 0)) {
        const date = getDateDiff(result[length].nextPaymentDate)

        if (!date) {
            length--
            continue
        }

        console.log('notified')
        // send notifications to all users scope waits till functions is resolved

    }
    console.log(`Notified ${notifiedUser} users!`)
}

schedule.scheduleJob('10 0 1 * * *', sendNotification)

// sendNotification()







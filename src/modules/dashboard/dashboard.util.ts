import moment from 'moment'
import { MemberShipPeriod } from './dashboard.interface';
import { ExpressError } from '../../app.util';
const getMothInNumbers = (period: string): number => {
    switch (period) {
        case MemberShipPeriod.MONTHLY:
            return 1
        case MemberShipPeriod.THREE_MONTH:
            return 3
        case MemberShipPeriod.SIX_MONTH:
            return 6
        case MemberShipPeriod.ONE_YEAR:
            return 12
        default:
            throw new ExpressError("Invalid subscription");
    }
}

export const getFutureDate = (period: string, date) => {
    const months = getMothInNumbers(period)
    const result = standardDate(moment(date).add(months, 'M').toDate())
    return result
}

export const standardDate = (dateString?) => {
    if (!dateString) {
        return new Date()
    }
    const validateDate = new Date(dateString)
    if (validateDate.toJSON()) {
        return validateDate
    }
    throw new ExpressError("Invalid date!", 400)
}
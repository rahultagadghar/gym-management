import { DashBoardRepo, } from './dashboard.repository';
import { Package } from './../package/package.repository';
import { ExpressResponse } from '../../app.interface';
import { DashBoardDTO } from './dashboard.dto';
import { getFutureDate, standardDate } from './dashboard.util';

const pack = new Package()
const dash = new DashBoardRepo()

export class DashBoardService {
    async getDashboard(req, res: ExpressResponse, next) {
        try {
            const { id, sort, search, memberShip } = req.query
            const dashBoard = await dash.getFullDashBoard(id, sort, search, memberShip)
            res.finish(dashBoard)
        } catch (error) {
            next(error)
        }
    }

    async updatePayment(req, res: ExpressResponse, next) {
        try {
            const { _id } = req.body
            const { amountPaidTillNow, dueAmount, nextPaymentDate } = await new DashBoardService().calculateAmount(req.body)

            const payload = { _id, amountPaidTillNow: amountPaidTillNow[0], dueAmount, nextPaymentDate }

            const result = await dash.updatePayment(payload)

            res.finish(result)
        } catch (error) {
            next(error)
        }
    }

    async calculateAmount(body) {

        const gotPackage = await pack.getDoc(body.packageId)

        const amountToPay = gotPackage[body.memberShip]

        const dueAmount = amountToPay - body.amount - body.discount

        const amountPaidTillNow = [{
            date: standardDate(),
            amount: body.amount
        }]
        const nextPaymentDate = getFutureDate(body.memberShip)

        return {
            amountPaidTillNow, nextPaymentDate, dueAmount
        }
    }

    async saveDashboard(req, res: ExpressResponse, next) {
        try {
            const body: DashBoardDTO = req.body

            const paymentPayload = await new DashBoardService().calculateAmount(body)

            const { _id } = await dash.savePayment(paymentPayload); //userId autoIncremented by mongoose

            const payloadForDashBoard = { ...body, paymentId: _id }
            const result = await dash.save(payloadForDashBoard)
            res.finish(result)
        } catch (error) {
            next(error)
        }
    }

    async updateDashBoard(req, res: ExpressResponse, next) {
        try {
            const body: DashBoardDTO = req.body
            const result = await dash.updateDash(body)
            res.finish(result)
        } catch (error) {
            next(error)
        }
    }
}


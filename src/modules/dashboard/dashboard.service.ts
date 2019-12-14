import { DashBoardRepo, } from './dashboard.repository';
import { Package } from './../package/package.repository';
import { ExpressResponse } from '../../app.interface';
import { DashBoardDTO } from './dashboard.dto';

const pack = new Package()
const dash = new DashBoardRepo()

export class DashBoardService {
    async getDashboard(req, res: ExpressResponse, next) {
        try {
            const { id, sort, search } = req.query
            const dashBoard = await dash.getFullDashBoard(id, sort, search)
            res.finish(dashBoard)
        } catch (error) {
            next(error)
        }
    }

    async saveDashboard(req, res: ExpressResponse, next) {
        try {
            const body: DashBoardDTO = req.body

            const gotPackage = await pack.getDoc(body.packageId)

            const amountToPay = gotPackage[body.memberShip]

            const dueAmount = amountToPay - body.amount - body.discount

            const amountPaidTillNow = [{
                date: new Date(),
                amount: body.amount
            }]

            const nextPaymentDate = new Date()

            const paymentPayload = {
                amountPaidTillNow, nextPaymentDate, dueAmount
            }
            const { _id, userId } = await dash.savePayment(paymentPayload); //userId autoIncremented by mongoose

            const payloadForDashBoard = { ...body, userId, paymentId: _id }
            const result = await dash.save(payloadForDashBoard)
            res.finish(result)
        } catch (error) {
            next(error)
        }
    }
}

import { dashBoardProps, dashBoardDoc, dashBoardModel, paymentModel, collections, paymentProps } from "./dashboard.model";
import { ObjectId } from "bson";


export class DashBoardRepo {

    public async getDoc(_id): Promise<dashBoardProps> {
        return await dashBoardModel.findOne({ _id }).lean();
    }

    public async updatePayment(doc) {
        const { _id, amountPaidTillNow, dueAmount, nextPaymentDate } = doc
        const body = {
            $push: { amountPaidTillNow }, dueAmount, nextPaymentDate
        }
        return await paymentModel.findOneAndUpdate({ _id }, body, { new: true })
    }

    public async getPayment(_id): Promise<dashBoardProps> {
        return await paymentModel.findOne({ _id }).lean();
    }

    public async save(doc) {
        return await new dashBoardModel(doc).save()
    }

    public async savePayment(doc): Promise<paymentProps> {
        return await new paymentModel(doc).save()
    }

    public async getFullDashBoard(_id?, sort?: boolean, search?: string, memberShip?: string): Promise<object[]> {
        return new Promise((resolve, reject) => {
            const pipeLine = []

            const $lookup = {
                from: collections.PAYMENT, // targetTable
                localField: "paymentId", // inputTable field
                foreignField: "_id", // targetTable field
                as: "paymentDetails" // inputTable output field
            }
            const $match = { _id: new ObjectId(_id) }

            const $sort = { "paymentDetails.dueAmount": -1 }

            const partialSearch = {
                $match: {
                    $or: [
                        {
                            fullName: {
                                $regex: search,
                                $options: "i"
                            }
                        },
                        {
                            phone: {
                                $regex: search,
                                $options: "i"
                            }
                        }
                    ]
                }
            }

            const calculateAge = {
                $addFields: {
                    age: {
                        $floor: {
                            $let: {
                                vars: {
                                    diff: {
                                        $subtract: [new Date(), "$dob"]
                                    }
                                },
                                in: {
                                    $divide: ["$$diff", (365 * 24 * 60 * 60 * 1000)]
                                }
                            }
                        }
                    }
                }
            }

            const memberPipe = {
                $match: { memberShip }
            }
            // first pipeLine state
            if (search) {
                pipeLine.push(partialSearch)
            }

            if (memberShip) {
                pipeLine.push(memberPipe)
            }


            pipeLine.push({ $lookup })

            if (_id) {
                pipeLine.push({ $match })
            }
            if (sort) {
                pipeLine.push({ $sort })
            }

            pipeLine.push(calculateAge)

            dashBoardModel.aggregate(pipeLine).exec((err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            });
        })

    }

    public async updateDash(doc) {
        const { _id } = doc
        return await dashBoardModel
            .findOneAndUpdate({ _id }, doc, { new: true })
            .lean();
    }

}
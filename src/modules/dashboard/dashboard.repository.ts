import { dashBoardProps, dashBoardDoc, dashBoardModel, paymentModel, collections, paymentProps } from "./dashboard.model";
import { ObjectId } from "bson";

export class DashBoardRepo {

    public async getDoc(_id): Promise<dashBoardProps> {
        return await dashBoardModel.findOne({ _id }).lean();
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

            dashBoardModel.aggregate(pipeLine).exec((err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            });
        })

    }

}


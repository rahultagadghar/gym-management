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

    public async getFullDashBoard(_id?): Promise<object[]> {
        return new Promise((resolve, reject) => {
            const pipeLine = []

            const $lookup = {
                from: collections.PAYMENT, // targetTable
                localField: "paymentId", // inputTable field
                foreignField: "_id", // targetTable field
                as: "paymentDetails" // inputTable output field
            }
            const $match = { _id: new ObjectId(_id) }

            pipeLine.push({ $lookup })

            if (_id) {
                pipeLine.push({ $match })
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


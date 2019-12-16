import { dashBoardProps, dashBoardModel, paymentModel, collections, paymentProps } from "./dashboard.model";
import { ObjectId } from "bson";
import { standardDate } from "./dashboard.util";
import { ExpressError } from "../../app.util";

const aggregations = {
    paymentById: {
        $lookup: {
            from: collections.PAYMENT, // targetTable
            localField: "paymentId", // inputTable field
            foreignField: "_id", // targetTable field
            as: "paymentDetails" // inputTable output field
        }
    },
    paymentAsObject: {
        paymentDetails: { $arrayElemAt: ["$paymentDetails", 0] }
    }
}

export class DashBoardRepo {

    public async getDoc(_id): Promise<dashBoardProps> {
        return await dashBoardModel.findOne({ _id }).lean();
    }

    public async updatePayment(doc) {
        const { _id, amountPaidTillNow, dueAmount, nextPaymentDate } = doc
        const found: paymentProps = await paymentModel.findOne({ _id }).lean()
        if (!found) {
            throw new ExpressError("Invalid payment details")
        }
        found.amountPaidTillNow.push(amountPaidTillNow)
        found.dueAmount += dueAmount;
        found.nextPaymentDate = nextPaymentDate
        return await paymentModel.updateOne({ _id }, found)
    }

    public async getAllPayments(): Promise<paymentProps[]> {
        return await paymentModel.find().lean()
    }

    public async getPayment(_id): Promise<paymentProps> {
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

            // const $lookup = {
            //     from: collections.PAYMENT, // targetTable
            //     localField: "paymentId", // inputTable field
            //     foreignField: "_id", // targetTable field
            //     as: "paymentDetails" // inputTable output field
            // }
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
                                        $subtract: [standardDate(), "$dob"]
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


            pipeLine.push(aggregations.paymentById)

            if (_id) {
                pipeLine.push({ $match })
            }
            if (sort) {
                pipeLine.push({ $sort })
            }

            pipeLine.push(calculateAge)

            pipeLine.push({
                $addFields: {
                    ...aggregations.paymentAsObject
                }
            })

            dashBoardModel.aggregate(pipeLine).exec((err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            });
        })

    }
    public async getDashBoardCounts(): Promise<object> {
        return new Promise((resolve, reject) => {
            dashBoardModel.aggregate([
                aggregations.paymentById,
                {
                    $lookup: {
                        from: collections.PACKAGE, // targetTable
                        localField: "packageId", // inputTable field
                        foreignField: "_id", // targetTable field
                        as: "packageDetails" // inputTable output field
                    }
                },
                {
                    $addFields: {
                        ...aggregations.paymentAsObject,
                        packageDetails: { $arrayElemAt: ["$packageDetails", 0] },
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalUsers: {
                            $sum: 1
                        },
                        pendingAmount: {
                            $sum: "$paymentDetails.dueAmount"
                        },
                        activeUsers: {
                            $sum: {
                                $cond: [{ $eq: ["$active", true] }, 1, 0]
                            }
                        },
                        inActiveUsers: {
                            $sum: {
                                $cond: [{ $eq: ["$active", false] }, 1, 0]
                            }
                        },
                        monthly: {
                            $sum: {
                                $cond: [{ $eq: ["$memberShip", "monthly"] }, 1, 0]
                            }
                        },
                        threeMonth: {
                            $sum: {
                                $cond: [{ $eq: ["$memberShip", "threeMonth"] }, 1, 0]
                            }
                        },
                        sixMonth: {
                            $sum: {
                                $cond: [{ $eq: ["$memberShip", "sixMonth"] }, 1, 0]
                            }
                        },
                        oneYear: {
                            $sum: {
                                $cond: [{ $eq: ["$memberShip", "oneYear"] }, 1, 0]
                            }
                        }
                    }
                },

            ])
                .allowDiskUse(true)
                .exec((err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result[0])
                })

        })
    }

    public async updateDash(doc) {
        const { _id } = doc
        return await dashBoardModel
            .findOneAndUpdate({ _id }, doc, { new: true })
            .lean();
    }

}

// const check = new DashBoardRepo()
// check.getDashBoardCounts().then(e => { console.log(JSON.stringify(e)) })
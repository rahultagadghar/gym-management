import { Schema, model } from 'mongoose'

const collection = "dashboard"

const stringRequired = { type: String, required: true }
const numberNull = { type: Number, default: null }
const stringNull = { type: String, default: null }
const dateNull = { type: Date, default: null }

const dashBoardSchema = new Schema({
    fullName: stringRequired,
    email: stringRequired,
    phone: stringRequired,
    dob: { type: Date, required: true },
    sex: stringRequired,
    package: stringRequired,
    memberShip: stringRequired,
    paidAmount: { type: Number, required: true },
    userId: numberNull, //[incrementing order starts from 0]
    active: { type: Boolean, default: null }, // required [true when registers by default ],
    occupation: stringNull,
    weight: numberNull,
    age: numberNull,
    height: numberNull,
    bmiLevel: numberNull,
    healthIssues: stringNull,
    address: stringNull,
    personalTrainer: stringNull,
    payment: numberNull, //, payment amount fetched from db , required [get by packageModel and memberShip],
    dueDate: dateNull, //, required [automated by memberShip selection]
    paidDate: dateNull, // [Updated when customer pays]
    discount: { type: Number, default: 0 }, //, default 0
    oldBalance: { type: Number, default: 0 }, //, default 0
    total: numberNull, //, required
    imageUrl: stringNull,
    emergency: {
        name: stringNull,
        relation: stringNull,
        phone: stringNull,
        secondaryPhone: stringNull
    }
}

})

export const dashBoardModel = model(collection, dashBoardSchema, collection)
import mongoose from 'mongoose'
import { createSchema, Type, typedModel, ExtractDoc, ExtractProps } from 'ts-mongoose';
import AutoIncrementFactory from 'mongoose-sequence'
const AutoIncrement = AutoIncrementFactory(mongoose)

const dashBoardSchema = createSchema(
    {
        fullName: Type.string({ required: true }),
        email: Type.string({ required: true }),
        phone: Type.string({ required: true }),
        dob: Type.date({ required: true }),
        sex: Type.string({ required: true }),
        memberShip: Type.string({ required: true }),
        userId: Type.number({ required: true }), //[incrementing order starts from 0]
        active: Type.boolean({ default: true }), // required [true when registers by default ],
        occupation: Type.string({ default: null }),
        weight: Type.number({ default: null }),
        age: Type.number({ default: null }),
        height: Type.number({ default: null }),
        bmiLevel: Type.number({ default: null }),
        healthIssues: Type.string({ default: null }),
        address: Type.string({ default: null }),
        personalTrainer: Type.string({ default: null }),
        imageUrl: Type.string({ default: null }),
        dateOfRegistration: Type.date({ default: Date.now }),

        paymentId: Type.objectId({ required: true }),
        packageId: Type.objectId({ required: true }),

        emergency: Type.object().of({
            name: Type.string({ default: null }),
            relation: Type.string({ default: null }),
            phone: Type.string({ default: null }),
            secondaryPhone: Type.string({ default: null })
        })
    }
);

const paymentSchema = createSchema(
    {
        userId: Type.number(),
        nextPaymentDate: Type.date({ required: true }),
        amountPaidTillNow: Type.array().of({
            date: Type.date({ required: true }),
            amount: Type.number({ required: true }),
            discount: Type.number({ default: 0 }),
        }),
        dueAmount: Type.number({ default: 0 }),
    })

paymentSchema.plugin(AutoIncrement, { inc_field: 'userId' })

export enum collections {
    DASHBOARD = "dashboards",
    PAYMENT = "payments"
}

export const dashBoardModel = typedModel(collections.DASHBOARD, dashBoardSchema);
export const paymentModel = typedModel(collections.PAYMENT, paymentSchema)

export type dashBoardProps = ExtractProps<typeof dashBoardSchema>;
export type dashBoardDoc = ExtractDoc<typeof dashBoardSchema>;

export type paymentProps = ExtractProps<typeof paymentSchema>;


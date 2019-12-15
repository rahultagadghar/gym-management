import { createSchema, Type, typedModel } from 'ts-mongoose';

/* 
    As it is basic implementation of  authentication 
    We are storing plain passwords
*/

const collection = "auths"

const authSchema = createSchema({
    userName: Type.string({ required: true }),
    password: Type.string({ required: true })
})

export const authModel = typedModel(collection, authSchema)


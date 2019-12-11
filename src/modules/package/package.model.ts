import { PackageModel } from './package.interface';

import { Schema, model } from 'mongoose'

enum collection {
    PACKAGE = "packages"
}

const packageSchema = new Schema({
    packageName: { type: String, required: true, unique: true },
    monthly: { type: Number, required: true },
    threeMonth: { type: Number, required: true },
    sixMonth: { type: Number, required: true },
    oneYear: { type: Number, required: true },
})

export const packageModel = model<PackageModel>(collection.PACKAGE, packageSchema, collection.PACKAGE)
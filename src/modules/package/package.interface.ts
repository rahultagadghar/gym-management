import { Document } from 'mongoose'

export interface PackageModel extends Document {
    packageName: string,
    monthly: number,
    threeMonth: number,
    sixMonth: number,
    oneYear: number,
}

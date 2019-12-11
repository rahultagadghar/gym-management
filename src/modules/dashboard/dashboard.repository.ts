
export class DashBoardRepo {
    // public async getAllDoc(): Promise<PackageModel[]> {
    //     return await packageModel.find().lean();
    // }

    public async getDoc(_id): Promise<PackageModel> {
        return await packageModel.findOne({ _id }).lean();
    }

    // public async create(doc: PackageModel) {
    //     return await new packageModel(doc).save();
    // }

    // public async updateDoc(doc) {
    //     const { _id } = doc
    //     return await packageModel
    //         .findOneAndUpdate({ _id }, doc, { new: true })
    //         .lean();
    // }
}


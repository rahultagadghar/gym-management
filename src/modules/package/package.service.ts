import { ExpressResponse } from '../../app.interface';
import { Package } from './package.repository';

const pack = new Package()
export class Management {
    public async savePackage(req, res: ExpressResponse, next) {
        try {
            const result = await pack.create(req.body)
            res.finish(result)
        } catch (error) {
            next(error)
        }
    }
    public async getPackage(req, res: ExpressResponse, next) {
        try {
            const { _id } = req.query
            if (_id) {
                return res.finish(await pack.getDoc(_id))
            }
            const result = await pack.getAllDoc()
            return res.finish(result)
        } catch (error) {
            next(error)
        }
    }
    public async updatePackage(req, res: ExpressResponse, next) {
        try {
            const result = await pack.updateDoc(req.body)
            res.finish(result)
        } catch (error) {
            next(error)
        }
    }
}
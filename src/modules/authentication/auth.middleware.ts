import { ExpressResponse } from '../../app.interface';
import { authModel } from './auth.model';
import httpErrors from 'http-errors'
import { AuthDTO } from './auth.dto';
/*  
    As we have only one user, 
    we can go with simple implementation of authentication
*/

/* 
    Every request is validated by authMiddleware
*/

export const authMiddleware = async (req, res: ExpressResponse, next) => {
    try {
        const { userName, password } = <AuthDTO>req.query
        const result = await authModel.findOne({ userName, password })
        if (!result) {
            throw new httpErrors.Unauthorized()
        }
        next()
    } catch (error) {
        next(error)
    }
}



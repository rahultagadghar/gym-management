import { dashBoard } from "./modules/dashboard/dashboard.route"
import { management } from "./modules/package/package.route";
import { authMiddleware } from "./modules/authentication/auth.middleware";
import { AuthDTO } from "./modules/authentication/auth.dto";
import { Query } from "./app.middleware";
import { ExpressResponse } from "./app.interface";
import { NotFound } from 'http-errors'
export const appRoutes = app => {

    app.get("/", (req, res: ExpressResponse, next) => {
        res.finish({}, "Gym Management Application")
    })

    app.use("/dashboard", Query.bind(AuthDTO), authMiddleware, dashBoard);
    app.use("/package", Query.bind(AuthDTO), authMiddleware, management)

    app.all("*", (req, res: ExpressResponse, next) => {
        try {
            throw new NotFound()
        } catch (error) {
            next(error)
        }
    })
}
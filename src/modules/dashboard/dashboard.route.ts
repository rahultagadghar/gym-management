import { Router } from "express";
import { Update, Body } from "../../app.middleware";
import { DashBoardService } from "./dashboard.service";
import { DashBoardDTO } from "./dashboard.dto";
// import { Package } from "../package/package.repository";

export const dashBoard = Router();

const { saveDashboard,getDashboard } = new DashBoardService();

dashBoard
    .route("/dashboard")
    .get(getDashboard)
    .post(Body.bind(DashBoardDTO), saveDashboard)
    // .put(Body.bind(Id), Update.bind(PackageDTO), updatePackage);

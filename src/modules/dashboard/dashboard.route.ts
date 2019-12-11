import { Router } from "express";
import { Update, Body } from "../../app.middleware";
import { DashBoardService } from "./dashboard.service";
import { DashBoardDTO } from "./dashboard.dto";

export const dashBoard = Router();

const { get } = new DashBoardService();

dashBoard
    .route("/dashboard")
    // .get(getPackage)
    .post(Body.bind(DashBoardDTO), get)
    // .put(Body.bind(Id), Update.bind(PackageDTO), updatePackage);

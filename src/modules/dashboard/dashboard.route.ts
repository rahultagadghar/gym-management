import { Router } from "express";
import { Update, Body } from "../../app.middleware";
import { DashBoardService } from "./dashboard.service";
import { DashBoardDTO } from "./dashboard.dto";
import { Id } from "../package/package.dto";
// import { Package } from "../package/package.repository";

export const dashBoard = Router();

const { saveDashboard, getDashboard, updateDashBoard } = new DashBoardService();

dashBoard
    .route("/dashboard")
    .get(getDashboard)
    .post(Body.bind(DashBoardDTO), saveDashboard)
    .put(Body.bind(Id), Update.bind(DashBoardDTO), updateDashBoard);

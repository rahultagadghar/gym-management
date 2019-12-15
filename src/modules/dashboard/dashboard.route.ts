import { Router } from "express";
import { Update, Body } from "../../app.middleware";
import { DashBoardService } from "./dashboard.service";
import { DashBoardDTO, PaymentDTO } from "./dashboard.dto";
import { Id } from "../package/package.dto";

export const dashBoard = Router();

const { saveDashboard, getDashboard, updateDashBoard, updatePayment, getCounts } = new DashBoardService();

dashBoard
    .route("/dashboard")
    .get(getDashboard)
    .post(Body.bind(DashBoardDTO), saveDashboard)
    .put(Body.bind(Id), Update.bind(DashBoardDTO), updateDashBoard)

dashBoard.route("/payment")
    .put(Body.bind(Id), Body.bind(PaymentDTO), updatePayment)

dashBoard.route("/counts")
    .get(getCounts)

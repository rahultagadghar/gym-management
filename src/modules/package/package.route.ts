import { Router } from "express";
import { Management } from "./package.service";
import { Update, Body } from "../../app.middleware";
import { PackageDTO, Id } from "./package.dto";

export const management = Router();

const { getPackage, savePackage, updatePackage } = new Management();

management
    .route("/package")
    .get(getPackage)
    .post(Body.bind(PackageDTO), savePackage)
    .put(Body.bind(Id), Update.bind(PackageDTO), updatePackage);

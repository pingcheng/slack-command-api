import express from "express";
import { router as sevenRouter } from "@functions/app/711FuelPrice";

const router = express.Router();

router.use("/711-fuel-price", sevenRouter);
export default router;

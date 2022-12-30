import express from "express";
import { router as sevenRouter } from "@functions/app/711FuelPrice";
import { router as interactivityRouter } from "@functions/app/interactivity";

const router = express.Router();

router.use("/711-fuel-price", sevenRouter);
router.use("/interactivity", interactivityRouter);
export default router;

import express from "express";
import { handle } from "@functions/app/interactivity/handler";
import * as console from "console";

export const router: express.Router = express.Router();

router.post("/", async (req, res) => {
  const body = req.body.payload;
  console.log("Received interactivity request", req);

  const payload = JSON.parse(body);

  if (!payload.type) {
    return res.send(`invalid request type`);
  }

  try {
    await handle(payload.type, body);
  } catch (error) {
    console.error("failed to process interactivity request", error, body);
    return res.status(500).send(`server error - ${error.message}`);
  }

  res.send("");
});

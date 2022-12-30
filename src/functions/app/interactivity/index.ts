import express from "express";
import { handle } from "@functions/app/interactivity/handler";
import * as console from "console";

export const router: express.Router = express.Router();

router.post("/", async (req, res) => {
  const payload = JSON.parse(req.body.toString());

  if (!payload.type) {
    return res.send(`invalid request type`);
  }

  try {
    await handle(payload.type, req.body.toString());
  } catch (error) {
    console.log("failed to process interactivity request", error, req.body);
    return res.status(500).send(`server error - ${error.message}`);
  }

  res.send("");
});

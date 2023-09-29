import express from "express";
import { enqueue, Queue } from "@libs/queue";
import { FuelPriceMessage } from "../../../common/types";
import * as console from "console";

// Create an SQS service object
export const router: express.Router = express.Router();
router.post("/", async (req, res) => {
  console.log("Received the 711 fuel price request", req);

  const text = String(req.body.text).trim().toLowerCase();
  const state = text === "" ? "all" : text;

  const message: FuelPriceMessage = {
    destination: {
      url: req.body.response_url,
      method: "post",
    },
    data: {
      fuelType: "U91",
      state,
      publicMessage: false,
    },
  };

  try {
    await enqueue(Queue.FUEL_PRICE, JSON.stringify(message));
  } catch (error) {
    console.error("Error happened", error);
    return res.send(`:cry: Something went wrong, please try again later`);
  }

  res.send(`:eyes: Looking into prices...`);
});

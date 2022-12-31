import express from "express";
import { enqueue, Queue } from "@libs/queue";
import { FuelPriceMessage } from "../../../common/types";

// Create an SQS service object
export const router: express.Router = express.Router();
router.post("/", async (req, res) => {
  console.log("Received the 711 fuel price request", req);
  const message: FuelPriceMessage = {
    destination: {
      url: req.body.response_url,
      method: "post",
    },
    data: {
      fuelType: "U91",
      publicMessage: false,
    },
  };

  enqueue(Queue.FUEL_PRICE, JSON.stringify(message))
    .then(() => {
      res.send(`:eyes: Looking into prices...`);
    })
    .catch((error) => {
      console.log("Error happened", error);
      res.send(`:cry: Something went wrong, please try again later`);
    });
});

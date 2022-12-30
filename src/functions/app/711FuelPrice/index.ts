import express from "express";
import { enqueue, Queue } from "@libs/queue";

// Create an SQS service object
export const router: express.Router = express.Router();
router.post("/", async (req, res) => {
  const message = {
    destination: {
      url: req.body.response_url,
      method: "post",
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

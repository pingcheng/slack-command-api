import express from "express";
import * as process from "process";
import AWS from "aws-sdk";

AWS.config.update({region: 'ap-southeast-2'});

// Create an SQS service object
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
export const router: express.Router = express.Router();
router.post("/", async (req, res) =>{

    const message = {
        response_url: req.body.response_url,
    }

    sqs.sendMessage({
        MessageBody: JSON.stringify(message),
        QueueUrl: process.env.SEVEN_ELEVEN_FUEL_PRICE_QUEUE_URL
    }, (err) => {
        if (err) {
            console.log(err);
            res.send("Failed to enqueue");
        } else {
            res.send("Queued");
        }
    })
})

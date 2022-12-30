import * as process from "process";
import AWS from "aws-sdk";

export enum Queue {
  FUEL_PRICE,
}

const queueUrl: Record<Queue, string | undefined> = {
  [Queue.FUEL_PRICE]: process.env.FUEL_PRICE_QUEUE_URL,
};

// Create an SQS service object
AWS.config.update({ region: "ap-southeast-2" });
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

export const enqueue = async (queue: Queue, message: string): Promise<void> => {
  await sqs
    .sendMessage({
      MessageBody: message,
      QueueUrl: queueUrl[queue],
    })
    .promise();
};

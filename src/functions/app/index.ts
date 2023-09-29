import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.server`,
  memorySize: 512,
  environment: {
    FUEL_PRICE_QUEUE_URL: "${env:FUEL_PRICE_QUEUE_URL}",
    SLACK_ACCESS_TOKEN: "${env:SLACK_ACCESS_TOKEN}",
  },
  events: [
    {
      http: "ANY /",
    },
    {
      http: "ANY /{proxy+}",
    },
  ],
};

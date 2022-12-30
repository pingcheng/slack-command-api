import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.server`,
  memorySize: 256,
  environment: {
    FUEL_PRICE_QUEUE_URL: "${env:FUEL_PRICE_QUEUE_URL}",
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

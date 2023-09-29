import type { AWS } from "@serverless/typescript";

import app from "@functions/app";

const serverlessConfiguration: AWS = {
  service: "slack-command-api",
  frameworkVersion: "3",
  useDotenv: true,
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-localstack",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    stage: "local",
    region: "ap-southeast-2",
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: "sqs:SendMessage",
            Resource: "${env:FUEL_PRICE_QUEUE_ARN}",
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { app },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: [],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    "serverless-offline": {
      noPrependStageInUrl: true,
    },
    localstack: {
      stages: ["local"],
    },
  },
};

module.exports = serverlessConfiguration;

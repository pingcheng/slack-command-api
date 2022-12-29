import serverless from 'serverless-http';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from "./routers";

const app = express();
dotenv.config();

app.use(express.urlencoded({
  extended: true
}))
app.use(router);

app.use((_req: Request, res: Response) => {
  res.status(404).send({ message: 'route is not found' });
});

export const server = serverless(app);
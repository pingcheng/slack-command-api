import serverless from 'serverless-http';
import express, { Request, Response } from 'express';
const app = express();
app.get('/message', (_req: Request, res: Response) => {
  res.send({ message: 'This is message route' });
});
app.use((_req: Request, res: Response) => {
  res.send({ message: 'Server is running' });
});
export const hello = serverless(app);
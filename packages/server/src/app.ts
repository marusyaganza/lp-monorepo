import express, { Express } from 'express';
import cors from 'cors';

const FE_URL = process.env.FE_URL;

const app: Express = express();
app.use(express.json());
app.use(cors({ origin: FE_URL }));

export default app;

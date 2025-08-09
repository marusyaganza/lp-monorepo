import express, { Express } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const FE_URL = process.env.FE_URL;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

const app: Express = express();
app.use(express.json());
app.use(cors({ origin: FE_URL }));
app.use(limiter);

export default app;

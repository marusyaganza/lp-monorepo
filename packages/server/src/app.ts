import express, { Express } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const FE_URL = process.env.FE_URL;
const isDemo = process?.env?.DEMO_VERSION === 'true';
const isProd = process?.env?.NODE_ENV === 'production';
const app: Express = express();

app.use(express.json());
app.use(cors({ origin: FE_URL }));

if (isDemo) {
  app.get('/ping', (_, res) => {
    res.status(200).send('OK');
  });
}

if (isProd) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
  });
  app.use(limiter);
}

export default app;

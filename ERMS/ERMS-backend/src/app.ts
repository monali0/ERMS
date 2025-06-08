import express from 'express';
import dotenv from 'dotenv';
import router from './api/routes';
import { errorHandler } from './api/middleware/error.middleware';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/api', router);
app.use(errorHandler);

export default app;

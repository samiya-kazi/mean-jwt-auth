import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import mongoose from 'mongoose';
import config from './config';
import userRouter from './routers/user.router';

const app: Express = express();

const corsConfig: CorsOptions = {
  origin: config.CORS_ORIGIN,
  credentials: true,
  exposedHeaders: ['Authorization']
}

app.use(cors(corsConfig));
app.use(express.json());
app.use('/user', userRouter);

(async function bootstrap () {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('Connected to DB.');
    app.listen(config.PORT, () => console.log('[server]: Server listening on port ', config.PORT));
  } catch (error) {
    console.error('Error starting server.');
    console.error(error);
  }
})();
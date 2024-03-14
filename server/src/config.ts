import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT ?? 3000,
  MONGO_URI: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/auth-example',
  JWT_SECRET: process.env.JWT_SECRET ?? 'jwt_secret',
  CORS_ORIGIN: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
}

export default config;
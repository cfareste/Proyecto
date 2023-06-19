import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const config = {
  PORT: process.env.PORT || 8080,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'chris',
  DB_PASSWORD: process.env.DB_PASSWORD || 'userpwd',
  DB_DATABASE: process.env.DB_DATABASE || 'proyecto',
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY || "auth_secret_key",
  AUTH_KEY_EXPIRATION: process.env.AUTH_KEY_EXPIRATION || "1h",
};

export default config;

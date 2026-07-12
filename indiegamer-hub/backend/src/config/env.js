import dotenv from 'dotenv';
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 5000),
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'change_this_secret',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  STEAM_COUNTRY: process.env.STEAM_COUNTRY || 'us',
  STEAM_LANG: process.env.STEAM_LANG || 'en'
};

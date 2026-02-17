import * as Joi from 'joi';

/**
 * Joi validation schema for environment variables
 * Ensures all required environment variables are present and valid
 */
export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  
  PORT: Joi.number().default(3000),
  
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().default('24h'),
  
  FRONTEND_URL: Joi.string().required(),
  
  BCRYPT_ROUNDS: Joi.number().default(10),
  
  SMTP_HOST: Joi.string(),
  SMTP_PORT: Joi.number(),
  SMTP_USER: Joi.string(),
  SMTP_PASSWORD: Joi.string(),
  SMTP_FROM: Joi.string(),
});

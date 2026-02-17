import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rateLimit';

/**
 * Decorator to set rate limiting for endpoints
 * @param requests - Number of requests allowed
 * @param windowMs - Time window in milliseconds
 */
export const RateLimit = (requests: number, windowMs: number) =>
  SetMetadata(RATE_LIMIT_KEY, { requests, windowMs });

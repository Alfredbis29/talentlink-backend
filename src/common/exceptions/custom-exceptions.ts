import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for authentication failures
 */
export class AuthenticationException extends HttpException {
  constructor(message: string = 'Authentication failed') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

/**
 * Custom exception for authorization failures
 */
export class AuthorizationException extends HttpException {
  constructor(message: string = 'Access denied') {
    super(message, HttpStatus.FORBIDDEN);
  }
}

/**
 * Custom exception for resource not found
 */
export class ResourceNotFoundException extends HttpException {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, HttpStatus.NOT_FOUND);
  }
}

/**
 * Custom exception for validation errors
 */
export class ValidationException extends HttpException {
  constructor(message: string = 'Validation failed', errors?: any) {
    super(
      {
        message,
        errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

/**
 * Custom exception for conflict errors (e.g., duplicate entry)
 */
export class ConflictException extends HttpException {
  constructor(message: string = 'Resource conflict') {
    super(message, HttpStatus.CONFLICT);
  }
}

/**
 * Custom exception for server errors
 */
export class InternalServerException extends HttpException {
  constructor(message: string = 'Internal server error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

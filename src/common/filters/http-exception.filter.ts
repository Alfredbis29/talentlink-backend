import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Global HTTP Exception Filter
 * Handles all HTTP exceptions and provides consistent error responses
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Extract message from different exception formats
    let message = 'Internal Server Error';
    let details: any = null;

    if (typeof exceptionResponse === 'object') {
      const response = exceptionResponse as any;
      message = response.message || message;
      details = response.error;
    } else {
      message = exceptionResponse;
    }

    // Log the error
    if (status >= 500) {
      this.logger.error(
        `Error: ${message}`,
        exception.stack,
        `${request.method} ${request.url}`,
      );
    } else {
      this.logger.warn(
        `Client Error: ${message}`,
        `${request.method} ${request.url}`,
      );
    }

    // Send consistent error response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: Array.isArray(message) ? message[0] : message,
      ...(details && { details }),
    });
  }
}

/**
 * Generic API response wrapper for consistent response structure
 */
export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
  timestamp: string;

  constructor(
    success: boolean,
    message: string,
    data?: T,
    error?: any,
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Create a success response
   */
  static success<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse(true, message, data);
  }

  /**
   * Create an error response
   */
  static error<T>(message: string, error?: any): ApiResponse<T> {
    return new ApiResponse(false, message, undefined, error);
  }
}

/**
 * Interceptor to wrap all responses with ApiResponse format
 */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (data instanceof ApiResponse) {
          return data;
        }
        return ApiResponse.success('Request successful', data);
      }),
    );
  }
}

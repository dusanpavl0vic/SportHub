import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Something went wrong';

    if (exception instanceof QueryFailedError) {
      const err = exception as any;
      if (err.code === '23505') { // PostgreSQL unique_violation
        status = HttpStatus.CONFLICT;
        message = {
          error: 'Duplicate entry',
          detail: err.detail,
        };
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = {
          error: 'Database query failed',
          detail: err.message,
        };
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}

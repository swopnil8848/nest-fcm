import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  private readonly logger = new Logger(CatchEverythingFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const isHttpException = exception instanceof HttpException;
    const httpStatus = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const isProduction = process.env.NODE_ENV === 'production';

    let message: string;

    if (isHttpException) {
      message = this.extractMessage(exception.getResponse());
    } else if (exception instanceof Error) {
      message = exception.message || 'Internal server error';
    } else {
      message = 'Internal server error';
    }

    const errorDetails =
      !isProduction && exception instanceof Error
        ? {
            name: exception.name,
            message: exception.message,
            stack: exception.stack?.split('\n').slice(0, 5),
          }
        : undefined;

    const responseBody = {
      statusCode: httpStatus,
      status: 'fail',
      message,
      ...(errorDetails && { error: errorDetails }),
      ...(isProduction
        ? {}
        : {
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(request),
          }),
    };

    this.logger.error(
      `Exception for ${request.method} ${request.url} - ${message}`,
      exception instanceof Error ? exception.stack : JSON.stringify(exception),
    );

    httpAdapter.reply(response, responseBody, httpStatus);
  }

  private extractMessage(response: string | object): string {
    if (typeof response === 'string') return response;

    if (
      typeof response === 'object' &&
      response !== null &&
      'message' in response
    ) {
      const message = (response as any).message;

      if (Array.isArray(message)) {
        return message.join(', ');
      }

      if (typeof message === 'string') {
        return message;
      }
    }

    return 'Internal server error';
  }
}

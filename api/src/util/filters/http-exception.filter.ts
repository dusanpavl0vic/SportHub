import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof PrismaClientKnownRequestError) {
            if (exception.code === 'P2002') {
                message = 'Duplicate entry found';
                status = HttpStatus.BAD_REQUEST;
            } else {
                message = 'Database error';
                status = HttpStatus.BAD_REQUEST;
            }
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseMessage = exception.getResponse();
            message = typeof responseMessage === 'string' 
                ? responseMessage 
                : (responseMessage as any)?.message || exception.message;
        } else if (exception?.message) {
            message = exception.message;
        }

        response.status(status).json({
            statusCode: status,
            message,
        });
    }
}

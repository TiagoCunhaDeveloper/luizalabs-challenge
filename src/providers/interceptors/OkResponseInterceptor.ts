import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Response as ExpressResponse, Request as ExpressRequest } from 'express'
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { classToClass } from 'class-transformer'

export class OkResponseInterceptor<T> implements NestInterceptor<T> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<ExpressRequest>()
        const response = context.switchToHttp().getResponse<ExpressResponse>()

        return next.handle().pipe(map(data => ({
            data: classToClass(data),
            timestamp: Date.now(),
            path: request.url,
            statusCode: response.statusCode,
            statusMessage: response.statusMessage,
        })))
    }
}
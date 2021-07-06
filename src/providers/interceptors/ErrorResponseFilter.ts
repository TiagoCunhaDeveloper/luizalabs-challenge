import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request } from 'express'

type ErrorMessageObject = {
    statusCode: number,
    message: string
    error: string
}

export class ErrorResponseFilter implements ExceptionFilter {

    catch(exception: HttpException | any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()
        let status: number
        let responseError: string | object
        if (exception?.hasOwnProperty('getStatus') || exception?.hasOwnProperty('getResponse')) {
            status = exception?.hasOwnProperty('getStatus') ? exception?.getStatus() : 500
            responseError = exception?.hasOwnProperty('getResponse') ? exception?.getResponse() : 'Internal Server Error'
        } else {
            status = exception.status
            responseError =  exception.response.error ?? exception.response.message
        }

        let statusMessage: string
        let responseErrorMessage: string

        if (typeof responseError !== 'string') {
            responseErrorMessage = (responseError as ErrorMessageObject).message
            statusMessage = (responseError as ErrorMessageObject).error
        }else {
            responseErrorMessage = exception?.response?.message
            statusMessage = responseError
        }
        
        return response
            .status(status)
            .json({
                errorMessage: responseErrorMessage,
                statusMessage: statusMessage,
                statusCode: status,
                timestamp: Date.now(),
                path: request.url
            })
    }

}
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class ExcludeVersionFromMongooseModel<T> implements NestInterceptor<T> {

    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(payload => {
            if (Array.isArray(payload)) {
                return payload.map(p => ({
                    ...p?._doc,
                    __v: undefined
                }))
            }
            return {
                ...payload?._doc,
                __v: undefined
            }
        }))
    }
}
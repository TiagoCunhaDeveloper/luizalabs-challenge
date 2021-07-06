import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { GetProductsDTO } from "../../dtos/GetProductsDTO";

export class QueryParamsToNumberPipe implements PipeTransform {
    
    transform(value: GetProductsDTO, _metadata: ArgumentMetadata) {
        return {
            page: +value.page || 1
        }
      }
    
}
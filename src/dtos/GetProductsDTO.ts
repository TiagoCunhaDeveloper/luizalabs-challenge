import {  IsOptional, IsString } from "class-validator"

export class GetProductsDTO {
  @IsString()
  @IsOptional()
  page: string | number
}
import {  IsString, MaxLength, MinLength } from "class-validator"

export class SaveFavoriteDTO {
  @IsString({ each: true })
  @MinLength(24,{ each: true })
  @MaxLength(24, { each: true })
  products: string[];
}
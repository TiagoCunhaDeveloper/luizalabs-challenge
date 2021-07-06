import {  IsString, MaxLength, MinLength } from "class-validator"

export class SaveFavoriteDTO {
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  idClient: string;

  @IsString({ each: true })
  @MinLength(24,{ each: true })
  @MaxLength(24, { each: true })
  products: string[];
}
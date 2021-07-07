import {  IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class UpdateClientDTO {
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  id: string;

  @IsString()
  @IsOptional()
  name: string

  @IsEmail()
  @IsOptional()
  email: string
}
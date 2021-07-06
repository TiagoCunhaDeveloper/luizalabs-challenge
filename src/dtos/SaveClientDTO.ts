import {  IsEmail, IsString } from "class-validator"

export class SaveClientDTO {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  password: string
}
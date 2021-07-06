import { forwardRef, Inject } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { classToClass } from "class-transformer";
import Crypto from 'crypto'
import { ClientModel } from "../domain/models/Client";
import { LoginDTO } from "../dtos/LoginDTO";
import { ClientService } from "./ClientService";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => ClientService))
    private readonly clientService: ClientService
  ) {}

  async login(payload: LoginDTO) {
    const client = await this.clientService.getByEmail(payload.email)

    if(!client) {
      throw new UnauthorizedException('Invalid credentials!')
    }

    const isSamePassword = await this.comparePassword(payload.password, client.password)

    if(isSamePassword) {
      client.password = undefined
      return this.generateJwt(classToClass(client))
    } {
      throw new UnauthorizedException('Invalid credentials!')
    }
  }

  async generateJwt(user: ClientModel): Promise<string> {
    return this.jwtService.signAsync({ user })
  }

  async hashPassword(
    password: string
  ): Promise<string> {
    return Crypto.createHash('sha256').update(password).digest('hex')
  }

  async comparePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return Crypto.createHash('sha256').update(password).digest('hex') === hashPassword
  }
}
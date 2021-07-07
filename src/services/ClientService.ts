import { ConflictException,forwardRef,Inject,Injectable, NotFoundException } from '@nestjs/common';
import { SaveClientDTO } from '../dtos/SaveClientDTO';
import { ClientModel } from '../domain/models/Client';
import { ClientRepository } from '../repositories/ClientRepository';
import { AuthService } from './AuthService';
import { UpdateClientDTO } from '../dtos/UpdateClientDTO';

@Injectable()
export class ClientService {

  constructor(
    private readonly clientRepository: ClientRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  async save(client: SaveClientDTO): Promise<void> {
    const existClient = await this.clientRepository.getByEmail(client.email);

    if(existClient) {
      throw new ConflictException(`The client with the email ${client.email} already exists`)
    }

    client.password = await this.authService.hashPassword(client.password)

    await this.clientRepository.create(client)  
  }
  
  async getByEmail(email: string): Promise<ClientModel> {
    return this.clientRepository.getByEmail(email)
  }

  async getById(id: string): Promise<ClientModel> {
    return this.clientRepository.getById(id)
  }

  async getAll(): Promise<ClientModel[]> {
    return this.clientRepository.getAll()
  }

  async update(payload: UpdateClientDTO): Promise<void> {
    const client = await this.getById(payload.id)

    if(!client) {
      throw new NotFoundException(`Client not found!`)
    }

    client.name = payload.name ?? client.name
    client.email = payload.email ?? client.email

    await this.clientRepository.update(client,payload.id)
  }

  async deleteById(id: string): Promise<void> {
    await this.clientRepository.deleteById(id)
  }
}

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientDocument, Client } from '../domain/schemas/ClientSchema';
import { SaveClientDTO } from '../dtos/SaveClientDTO';
import { ClientModel } from '../domain/models/Client';

@Injectable()
export class ClientRepository {

  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async create(client: SaveClientDTO): Promise<void> {
    await this.clientModel.create(client);
  }
  
  async getByEmail(email: string): Promise<ClientModel> {
    return this.clientModel.findOne({ email })
  }

  async getById(id: string): Promise<ClientModel> {
    return this.clientModel.findById(id)
  }

  async getAll(): Promise<ClientModel[]> {
    return this.clientModel.find()
  }

  async update(client: SaveClientDTO, id: string): Promise<void> {
    await this.clientModel.updateOne({ id }, client)
  }

  async deleteById(id: string): Promise<void> {
    await this.clientModel.deleteOne({ id })
  }
}

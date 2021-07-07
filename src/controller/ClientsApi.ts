import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { SaveClientDTO } from '../dtos/SaveClientDTO';
import { ClientModel } from '../domain/models/Client';
import { ClientService } from '../services/ClientService';
import { ExcludeVersionFromMongooseModel } from '../providers/interceptors/ExcludeVersionFromMongooseModel';
import { JwtAuthGuard } from '../providers/guards/JwtAuthGuard';
import { UpdateClientDTO } from '../dtos/UpdateClientDTO';
import { DeleteClientDTO } from '../dtos/DeleteClientDTO';

@Controller('client')
export class ClientsApi {

  constructor(
    private readonly clientService: ClientService
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ExcludeVersionFromMongooseModel())
  getAll(): Promise<ClientModel[]> {
    return this.clientService.getAll()
  }

  @Get(':email')
  @UseInterceptors(new ExcludeVersionFromMongooseModel())
  @UseGuards(JwtAuthGuard)
  getByEmail(@Param('email') email: string): Promise<ClientModel> {
    return this.clientService.getByEmail(email)
  }

  @Post()
  save(@Body() product: SaveClientDTO): Promise<void> {
    return this.clientService.save(product)
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  update(@Body() product: UpdateClientDTO): Promise<void> {
    return this.clientService.update(product)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param() payload: DeleteClientDTO): Promise<void> {
    return this.clientService.deleteById(payload.id)
  }
}

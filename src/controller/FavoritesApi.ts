import { Body, Get, Request, UseInterceptors } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ClientModel } from '../domain/models/Client';
import { FavoriteModel } from '../domain/models/Favorite';
import { SaveFavoriteDTO } from '../dtos/SaveFavoriteDTO';
import { JwtAuthGuard } from '../providers/guards/JwtAuthGuard';
import { ExcludeVersionFromMongooseModel } from '../providers/interceptors/ExcludeVersionFromMongooseModel';
import { FavoriteServices } from '../services/FavoriteServices';

@Controller('favorite')
export class FavoritesApi {
  
  constructor(
    private readonly favoriteService: FavoriteServices
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async saveFavorite(@Body() payload: SaveFavoriteDTO, @Request() request: { user: { user: Partial<ClientModel> } }): Promise<void> {
    return this.favoriteService.save(payload, request.user.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ExcludeVersionFromMongooseModel())
  async getByIdClient(@Request() request: { user: { user: Partial<ClientModel> } }): Promise<FavoriteModel> {
    return this.favoriteService.getByIdClient(request.user.user.id);
  }

}

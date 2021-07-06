import { Body, Get, Param, UseInterceptors } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
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
  async saveFavorite(@Body() payload: SaveFavoriteDTO): Promise<void> {
    return this.favoriteService.saveFavorite(payload);
  }

  @Get(':idClient')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ExcludeVersionFromMongooseModel())
  async getByIdClient(@Param('idClient') idClient: string): Promise<FavoriteModel> {
    return this.favoriteService.getByIdClient(idClient);
  }

}

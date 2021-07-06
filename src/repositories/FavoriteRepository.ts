import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FavoriteDocument, Favorite } from '../domain/schemas/FavoriteSchema';
import { FavoriteModel } from '../domain/models/Favorite';
import { SaveFavoriteDTO } from '../dtos/SaveFavoriteDTO';

@Injectable()
export class FavoriteRepository {

  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
  ) {}

  async findByClientIdOrCreate(payload: SaveFavoriteDTO): Promise<FavoriteModel> {
    let favorite = await this.favoriteModel.findOne({ idClient: payload.idClient })

    if(!favorite) {
      const newFavorite = {
        idClient: payload.idClient,
        products: []
      }
      favorite = await this.favoriteModel.create(newFavorite)
    }

    return favorite
  }

  async findByClientId(idClient: string): Promise<FavoriteModel> {
    return this.favoriteModel.findOne({ idClient })
  }

  async update(favorite: FavoriteModel): Promise<void> {
    await this.favoriteModel.updateOne({ _id: favorite.id }, favorite)
  }

}

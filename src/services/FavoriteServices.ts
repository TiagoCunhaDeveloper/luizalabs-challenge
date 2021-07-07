
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { SaveFavoriteDTO } from '../dtos/SaveFavoriteDTO';
import { FavoriteProducts } from '../domain/models/FavoriteProduct';
import { ClientService } from './ClientService';
import { ProductsService } from './ProductsService';
import { FavoriteRepository } from '../repositories/FavoriteRepository';
import { FavoriteModel } from '../domain/models/Favorite';
import { ClientModel } from '../domain/models/Client';

@Injectable()
export class FavoriteServices {

  constructor(
    private readonly clientService: ClientService,
    private readonly productsService: ProductsService,
    private readonly favoriteRepository: FavoriteRepository
  ) {}

  async save(payload: SaveFavoriteDTO, user: Partial<ClientModel>): Promise<void> {
    const client = await this.clientService.getById(user.id)

    if(!client) {
      throw new NotFoundException(`Client not found!`)
    }

    const favorite = await this.favoriteRepository.findByClientIdOrCreate(user.id)    

    favorite.products = await this.validateProducts(payload,favorite)

    await this.favoriteRepository.update(favorite)

  }

  async getByIdClient(idClient: string): Promise<FavoriteModel> {
    return this.favoriteRepository.findByClientId(idClient)
  }

  async validateProducts(payload: SaveFavoriteDTO, favorite: FavoriteModel): Promise<FavoriteProducts[]> {
    const existingProducts: FavoriteProducts[] = []

    for (const productId of payload.products) {
      const existsProduct = await this.productsService.getById(productId)

      if(existsProduct){        
        const productExist = favorite.products.find(product => product.id === existsProduct.id)

        if(!productExist) {
          existingProducts.push({
            id: existsProduct.id,
            name: existsProduct.title,
            imageUrl: existsProduct.image,
          })
        }        
      }
    }

    return existingProducts.length ? existingProducts.concat(favorite.products) : favorite.products
  }

}

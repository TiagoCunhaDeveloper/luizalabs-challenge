import { Injectable } from '@nestjs/common';
import { ProductModel } from '../domain/models/Product';
import { ProductRepository } from '../repositories/ProductRepository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductRepository
  ) {}

  async getByPage(page: number, limit = 2): Promise<ProductModel[]> {
    return this.productsRepository.getByPage(page, limit);   
  }

  async createProduct(product: ProductModel): Promise<void> {
    await this.productsRepository.create(product);
  }
  
  async deleteAll(): Promise<void> {
    await this.productsRepository.deleteAll()
  }

  async getById(id: string): Promise<ProductModel> {
    return this.productsRepository.getById(id)
  }
}

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, Product } from '../domain/schemas/ProductSchema';
import { ProductModel } from '../domain/models/Product';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getByPage(page: number, limit = 2): Promise<ProductModel[]> {
    const product = await this.productModel.find().skip((page - 1) * limit).limit(limit)
    return product;    
  }

  async create(product: ProductModel): Promise<void> {
    await this.productModel.create(product)
  }
  
  async deleteAll(): Promise<void> {
    await this.productModel.deleteMany()

    return
  }

  async getById(id: string): Promise<ProductModel> {
    const product = await this.productModel.findById(id)

    return product
  }
}

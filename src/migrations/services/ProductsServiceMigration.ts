import csv from 'csvtojson';
import { resolve } from 'path';
import { Injectable } from '@nestjs/common';
import { ProductsService } from '../../services/ProductsService';
import { ProductModel } from '../../domain/models/Product';

@Injectable()
export class ProductsServiceMigration {
  constructor(
    private readonly productsService: ProductsService
  ) {}
  
  async loadTable(): Promise<void> {
    const filePath = resolve(
      process.cwd(),
      'resources',
      'migration',
      'products.csv',
    );

    const jsonArray = await csv().fromFile(filePath);

    for (let i = 0; i < jsonArray.length; i++) {
      const { title,image,brand,price,reviewScore } = jsonArray[i];

      const product = new ProductModel()
      product.title = title,
      product.image = image
      product.brand = brand
      product.price = price
      product.reviewScore = reviewScore

      await this.productsService.createProduct(product);
    }

    return;
  }

  async deleteData(): Promise<void> {
    await this.productsService.deleteAll();
  }
}

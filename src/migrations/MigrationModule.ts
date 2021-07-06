import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from '../domain/schemas/ProductSchema';
import { ProductsService } from '../services/ProductsService';

import { ProductsServiceMigration } from './services/ProductsServiceMigration';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://omnistack:omnistack@cluster0.pdycg.mongodb.net/luizalabs-app?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [],
  providers: [ProductsServiceMigration, ProductsService],
})
export class MigrationModule {}

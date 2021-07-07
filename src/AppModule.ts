import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthApi } from './controller/AuthApi';
import { ClientsApi } from './controller/ClientsApi';
import { FavoritesApi } from './controller/FavoritesApi';

import { ProductsApi } from './controller/ProductsApi';
import { Client, ClientSchema } from './domain/schemas/ClientSchema';
import { Favorite, FavoriteSchema } from './domain/schemas/FavoriteSchema';
import { Product, ProductSchema } from './domain/schemas/ProductSchema';
import { JwtAuthGuard } from './providers/guards/JwtAuthGuard';
import { JwtStrategy } from './providers/guards/JwtStrategy';
import { ClientRepository } from './repositories/ClientRepository';
import { FavoriteRepository } from './repositories/FavoriteRepository';
import { ProductRepository } from './repositories/ProductRepository';
import { AuthService } from './services/AuthService';
import { ClientService } from './services/ClientService';
import { FavoriteServices } from './services/FavoriteServices';
import { ProductsService } from './services/ProductsService';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({ 
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      load:[]
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL,
    ),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }]),
  ],
  controllers: [ProductsApi, ClientsApi, FavoritesApi, AuthApi],
  providers: [ProductsService, ClientService,FavoriteServices, FavoriteRepository, ProductRepository, ClientRepository, AuthService,JwtStrategy, JwtAuthGuard],
})
export class AppModule {}

import { UseGuards, UsePipes } from '@nestjs/common';
import { Param, UseInterceptors } from '@nestjs/common';
import { Controller, Get, Query } from '@nestjs/common';
import { GetProductsDTO } from '../dtos/GetProductsDTO';
import { ProductModel } from '../domain/models/Product';
import { ExcludeVersionFromMongooseModel } from '../providers/interceptors/ExcludeVersionFromMongooseModel';
import { QueryParamsToNumberPipe } from '../providers/pipes/QueryParamsToNumberPipe';
import { ProductsService } from '../services/ProductsService';
import { JwtAuthGuard } from '../providers/guards/JwtAuthGuard';
import { GetProductDTO } from '../dtos/GetProductDTO';

@Controller('product')
export class ProductsApi {
  
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ExcludeVersionFromMongooseModel())
  @UsePipes(new QueryParamsToNumberPipe())
  async getProducts(@Query() payload: GetProductsDTO): Promise<ProductModel[]> {
    return this.productsService.getByPage(payload.page as number);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ExcludeVersionFromMongooseModel())
  async getProduct(@Param() payload: GetProductDTO): Promise<ProductModel> {
    console.log('PAY',payload)
    return this.productsService.getById(payload.id);
  }
}

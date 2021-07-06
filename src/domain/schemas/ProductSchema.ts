import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  brand: string;

  @Prop()
  price: number;

  @Prop()
  reviewScore: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

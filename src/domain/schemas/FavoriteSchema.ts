import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FavoriteProducts } from '../models/FavoriteProduct';

export type FavoriteDocument = Favorite & Document;

@Schema()
export class Favorite {
  @Prop()
  idClient: string;

  @Prop()
  products: FavoriteProducts[];
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);


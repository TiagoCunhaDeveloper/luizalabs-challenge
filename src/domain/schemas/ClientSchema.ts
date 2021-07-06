import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer'

export type ClientDocument = Client & Document;

@Schema()
export class Client {  
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  @Exclude()
  password: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);


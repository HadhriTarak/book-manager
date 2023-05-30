import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AuthorDocument = HydratedDocument<AuthorModel>;

@Schema()
export class AuthorModel {
  @Prop()
  name: string;
}

export class AuthorDAO extends AuthorModel {
  _id: Types.ObjectId;
}

export const AuthorSchema = SchemaFactory.createForClass(AuthorModel)
  .set('versionKey', false)
  .set('timestamps', true);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BooksPerDayDocument = HydratedDocument<BooksPerDayModel>;

@Schema()
export class BooksPerDayModel {
  @Prop()
  day: Date;

  @Prop()
  totalNumber: number;

  @Prop()
  newBooksNumber: number;
}

export class BooksPerDayDAO extends BooksPerDayModel {
  _id: Types.ObjectId;
}

export const BooksPerDaySchema = SchemaFactory.createForClass(
  BooksPerDayModel,
).set('versionKey', false);

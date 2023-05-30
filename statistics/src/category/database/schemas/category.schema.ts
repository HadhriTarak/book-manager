import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<CategoryModel>;

@Schema()
export class CategoryModel {
  @Prop()
  name: string;
}

export class CategoryDAO extends CategoryModel {
  _id: Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel)
  .set('versionKey', false)
  .set('timestamps', true);

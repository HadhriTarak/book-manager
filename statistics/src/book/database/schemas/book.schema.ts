import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { AuthorDAO } from 'src/author/database/schemas/author.schema';
import { CategoryDAO } from 'src/category/database/schemas/category.schema';

export type BookDocument = HydratedDocument<BookModel>;

@Schema()
export class BookModel {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: Partial<AuthorDAO>;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categories: Partial<CategoryDAO>[];

  @Prop()
  addDate: Date;
}

export class BookDAO extends BookModel {
  _id: Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(BookModel)
  .set('versionKey', false)
  .set('timestamps', true);

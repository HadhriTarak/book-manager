import { Injectable } from '@nestjs/common';
import { Book } from 'application/book/entities/book';
import { BookDAO } from '../schemas/book.schema';
import { AuthorDataMapper } from '../../../author/database/mappers/author.mapper';
import { CategoryDataMapper } from '../../../category/database/mappers/category.mapper';
import { CategoryDAO } from '@App/category/database/schemas/category.schema';
import { AuthorDAO } from '../../../author/database/schemas/author.schema';
import { Types } from 'mongoose';

@Injectable()
export class BookDataMapper {
  public static toDb = (book: Book) => {
    const { id, author, categories, ...rest } = book;
    return {
      ...(id && { _id: new Types.ObjectId(id) }),
      author: author?.id ? new Types.ObjectId(author.id) : author,
      categories: categories.map((category) =>
        category?.id ? new Types.ObjectId(category.id) : category,
      ),
      ...rest,
    };
  };

  public static fromDB = (book: BookDAO) => {
    const { _id, author, categories, ...rest } = book;
    return {
      ...(_id && { id: _id.toString() }),
      author: Object.keys(author).find((element) => element === '_id')
        ? AuthorDataMapper.fromDB(author as AuthorDAO)
        : { id: author.toString() },
      categories: categories.map((category) =>
        Object.keys(category).find((element) => element === '_id')
          ? CategoryDataMapper.fromDb(category as CategoryDAO)
          : { id: category.toString() },
      ),
      ...rest,
    } as Book;
  };
}

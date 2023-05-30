import { Injectable } from '@nestjs/common';
import { Book } from 'application/book/entities/book';
import { BookDAO } from '../schemas/book.schema';
import { AuthorDataMapper } from '../../../author/database/mappers/author.mapper';
import { CategoryDataMapper } from '../../../category/database/mappers/category.mapper';
import { AuthorDAO } from 'src/author/database/schemas/author.schema';
import { CategoryDAO } from 'src/category/database/schemas/category.schema';

@Injectable()
export class BookDataMapper {
  public static toDb = (book: Book) => {
    const { id, author, categories, ...rest } = book;
    return {
      ...(id && { id: id.toString() }),
      author: author?.id ? author.id : author,
      categories: categories.map((category) =>
        category?.id ? category.id : category,
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

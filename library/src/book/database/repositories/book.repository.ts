import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from 'application/book/entities/book';
import { Model } from 'mongoose';
import { BookDataMapper } from '../mappers/book.mapper';
import { BookDocument } from '../schemas/book.schema';
import { AbstractBookRepository } from './book.repository.abstract';

@Injectable()
export class BookRepository extends AbstractBookRepository {
  constructor(@InjectModel('Book') private bookModel: Model<BookDocument>) {
    super();
  }

  create = async (book: Book) => {
    const createdBook = new this.bookModel(BookDataMapper.toDb(book));
    await createdBook.save();
    const result = await this.bookModel
      .findById(createdBook._id)
      .populate('author')
      .populate('categories')
      .lean();
    return BookDataMapper.fromDB(result);
  };
}

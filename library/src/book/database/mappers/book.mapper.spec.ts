import { BookDataMapper } from './book.mapper';
import { Book } from '../../../../application/book/entities/book';
import { BookDAO } from '../schemas/book.schema';
import { Types } from 'mongoose';

describe('book mapper tests', () => {
  it('should return BookDao type', () => {
    const id = new Types.ObjectId();
    const authorId = new Types.ObjectId();
    const category1Id = new Types.ObjectId();
    const category2Id = new Types.ObjectId();
    const today = new Date();
    const book: Book = {
      id: id.toString(),
      title: 'book title',
      author: { id: authorId.toString() },
      categories: [
        { id: category1Id.toString() },
        { id: category2Id.toString() },
      ],
      addDate: today,
    };
    const newBook = BookDataMapper.toDb(book);
    const expectedResult: BookDAO = {
      _id: id,
      title: 'book title',
      author: authorId,
      categories: [category1Id, category2Id],
      addDate: today,
    };
    expect(newBook).toEqual(expectedResult);
  });

  it('should return Book type', () => {
    const id = new Types.ObjectId();
    const authorId = new Types.ObjectId();
    const category1Id = new Types.ObjectId();
    const category2Id = new Types.ObjectId();
    const today = new Date();

    const book: BookDAO = {
      _id: id,
      title: 'book title',
      author: authorId,
      categories: [{ _id: category1Id }, { _id: category2Id }],
      addDate: today,
    };
    const newBook = BookDataMapper.fromDB(book);
    const expectedResult: Book = {
      id: id.toString(),
      title: 'book title',
      author: { id: authorId.toString() },
      categories: [
        { id: category1Id.toString() },
        { id: category2Id.toString() },
      ],
      addDate: today,
    };

    expect(newBook).toEqual(expectedResult);
  });
});

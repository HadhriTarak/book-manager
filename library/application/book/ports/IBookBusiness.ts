import { Book } from '../entities/book';

export interface IBookBusiness {
  createBook: (book: Book) => Promise<Book>;
}

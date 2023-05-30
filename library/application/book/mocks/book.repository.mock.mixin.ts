import { Constructor } from '../../../utils/types/constructor';
import { Book } from '../entities/book';
import { IBookRepository } from '../ports/IBookRepository';

export function BookRepositoryMockMixin<TBase extends Constructor>(
  Base: TBase,
) {
  return class BookRepositoryMock extends Base implements IBookRepository {
    books: Book[] = [];

    constructor(...args: any[]) {
      super(args);
      this.books = [];
    }

    async create(book: Book) {
      const newBook = {
        id: (Math.random() + 1).toString(36).substring(7),
        ...book,
      };
      this.books.push(newBook);
      return Promise.resolve(newBook);
    }
  };
}

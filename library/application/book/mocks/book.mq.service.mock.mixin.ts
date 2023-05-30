import { Constructor } from '../../../utils/types/constructor';
import { Book } from '../entities/book';
import { IBookMqService } from '../ports/IBookMqService';
export function BookMqServiceMockMixin<Tbase extends Constructor>(Base: Tbase) {
  return class BookMqServiceMock extends Base implements IBookMqService {
    books: Book[];
    constructor(...args: any[]) {
      super(args);
    }

    sendNewBook = (book: Book) => {
      this.books.push(book);
    };
  };
}

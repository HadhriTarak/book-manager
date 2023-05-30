import { Book } from '../entities/book';
import { IBookBusiness } from '../ports/IBookBusiness';
import { IBookRepository } from '../ports/IBookRepository';

export class BookBusiness implements IBookBusiness {
  constructor(private bookRepository: IBookRepository) {}
  public createBook = async (book: Book) => this.bookRepository.create(book);
}

import { Book } from '../entities/book';
import { IBookBusiness } from '../ports/IBookBusiness';
import { IBookMqService } from '../ports/IBookMqService';
import { IBookRepository } from '../ports/IBookRepository';

export class BookBusiness implements IBookBusiness {
  constructor(
    private bookRepository: IBookRepository,
    private bookMqService: IBookMqService,
  ) {}
  public createBook = async (book: Book) => {
    const bookToAdd = { ...book, addDate: new Date() };
    const newBook = await this.bookRepository.create(bookToAdd);
    await this.bookMqService.sendNewBook(newBook);
    return newBook;
  };
}

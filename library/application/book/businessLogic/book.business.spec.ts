import { BookRepositoryMock } from '../mocks/book.repository.mock';
import { IBookMqService } from '../ports/IBookMqService';
import { IBookRepository } from '../ports/IBookRepository';
import { BookBusiness } from './book.business';
import { BookMsServiceMock } from '../mocks/book.mq.service.mock';

describe('book business', () => {
  let bookBusiness: BookBusiness;
  let bookRepository: IBookRepository;
  let bookMqService: IBookMqService;

  beforeEach(() => {
    bookRepository = new BookRepositoryMock();
    bookMqService = new BookMsServiceMock();
    bookMqService.sendNewBook = jest.fn();
    bookBusiness = new BookBusiness(bookRepository, bookMqService);
  });

  describe('create', () => {
    const category = {
      name: 'category 1',
      id: Math.floor(Math.random() * 10000000000).toString(),
    };
    const author = {
      name: 'author 1',
      id: Math.floor(Math.random() * 10000000000).toString(),
    };
    const book = {
      title: 'book 1',
      author,
      categories: [category],
    };
    it('should create a book', async () => {
      const newBook = await bookBusiness.createBook(book);
      expect(newBook).toHaveProperty('id');
      expect(newBook).toHaveProperty('addDate');
      const { addDate: _, ...bookToMatch } = newBook;
      const expectedBook = { ...{ id: newBook.id }, ...book };
      expect(bookToMatch).toEqual(expectedBook);
      expect(bookMqService.sendNewBook).toBeCalled();
    });
  });
});

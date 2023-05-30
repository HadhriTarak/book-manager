import { BookRepositoryMock } from '../mocks/book.repository.mock';
import { IBookRepository } from '../ports/IBookRepository';
import { BookBusiness } from './book.business';

describe('book business', () => {
  let bookBusiness: BookBusiness;
  let bookRepository: IBookRepository;

  beforeEach(() => {
    bookRepository = new BookRepositoryMock();
    bookBusiness = new BookBusiness(bookRepository);
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
      addDate: new Date(),
    };
    it('should create a book', async () => {
      const newBook = await bookBusiness.createBook(book);
      expect(newBook).toHaveProperty('id');
      const expectedBook = { ...{ id: newBook.id }, ...book };
      expect(newBook).toEqual(expectedBook);
    });
  });
});

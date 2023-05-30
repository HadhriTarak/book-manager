import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { BookBusiness } from '../../../../application/book/businessLogic/book.business';
import { Book } from '../../../../application/book/entities/book';
import { Category } from '../../../../application/category/entities/category';
import { Author } from '../../../../application/author/entities/author';
import { BookController } from './book.controller';
import { AbstractBookRepository } from '../../database/repositories/book.repository.abstract';
import { BookRepositoryMock } from '../../mocks/book.repository.mock';

describe('BookController', () => {
  let app: TestingModule;
  let bookController: BookController;
  let book: Book;
  let bookTitle: string;
  let authorName: string;
  let author: Author;
  let categoryName: string;
  let category: Category;
  let authorId: string;
  let categoryId: string;
  const today = new Date();

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [BookController],
      providers: [
        BookBusiness,
        {
          provide: AbstractBookRepository,
          useClass: BookRepositoryMock,
        },
      ],
    }).compile();
    authorName = 'author 1';
    authorId = Math.floor(Math.random() * 10000000000).toString();
    author = {
      id: authorId,
      name: authorName,
    };
    categoryName = 'category 1';
    categoryId = Math.floor(Math.random() * 10000000000).toString();
    category = {
      name: categoryName,
      id: categoryId,
    };
    bookTitle = 'book 1';
    book = {
      title: bookTitle,
      author: author,
      categories: [category],
      addDate: new Date(today),
    };

    bookController = app.get<BookController>(BookController);
  });

  describe('create a book', () => {
    it('should create a book', async () => {
      const newBook = await bookController.create(book);
      expect(newBook).toHaveProperty('id');
      const expectedBook = {
        ...{ id: newBook.id },
        title: bookTitle,
        author: author,
        categories: [category],
        addDate: new Date(today),
      };
      expect(newBook).toEqual(expectedBook);
    });
  });
});

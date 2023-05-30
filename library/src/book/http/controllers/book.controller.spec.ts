import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { BookBusiness } from '../../../../application/book/businessLogic/book.business';
import { BookController } from './book.controller';
import { AbstractBookRepository } from '../../database/repositories/book.repository.abstract';
import { BookRepositoryMock } from '../../mocks/mq/repositories/book.repository.mock';
import { CreateBookDTO } from '../validation/createBook.dto';
import { AbstractBookMqService } from '../../mq/book.mq.client.abstract';
import { BookMqServiceMock } from '../../mocks/mq/book.mq.client.mock';

describe('BookController', () => {
  let app: TestingModule;
  let bookController: BookController;
  let bookMqService: AbstractBookMqService;
  let bookTitle: string;
  let authorId: string;
  let categoryId: string;
  let createBookDto: CreateBookDTO;

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
        {
          provide: AbstractBookMqService,
          useClass: BookMqServiceMock,
        },
      ],
    }).compile();
    authorId = Math.floor(Math.random() * 10000000000).toString();
    categoryId = Math.floor(Math.random() * 10000000000).toString();
    bookTitle = 'book 1';
    createBookDto = new CreateBookDTO();
    createBookDto.title = bookTitle;
    createBookDto.author = authorId;
    createBookDto.categories = [categoryId];

    bookController = app.get<BookController>(BookController);
    bookMqService = app.get<AbstractBookMqService>(AbstractBookMqService);
    bookMqService.sendNewBook = jest.fn();
  });

  describe('create a book', () => {
    it('should create a book', async () => {
      const newBook = await bookController.create(createBookDto);
      expect(newBook).toHaveProperty('id');
      expect(newBook).toHaveProperty('addDate');
      const expectedBook = {
        ...{ id: newBook.id },
        title: bookTitle,
        author: { id: authorId },
        categories: [{ id: categoryId }],
        addDate: newBook.addDate,
      };
      expect(newBook).toEqual(expectedBook);
      expect(bookMqService.sendNewBook).toBeCalled();
    });
  });
});

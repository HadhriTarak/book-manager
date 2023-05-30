import { AbstractAuthorRepository } from '../../database/repositories/author.repository.abstract';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorBusiness } from '../../../../application/author/businessLogic/author.business';
import { Author } from 'application/author/entities/author';
import { AuthorController } from './author.controller';
import { AuthorRepositoryMock } from '../../mocks/repositories/author.repository.mock';

describe('AuthorController', () => {
  let app: TestingModule;
  let authorController: AuthorController;
  let authorRepository: AbstractAuthorRepository;
  let name: string;
  let authorId: string;
  let author: Author;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [AuthorController],
      providers: [
        AuthorBusiness,
        {
          provide: AbstractAuthorRepository,
          useClass: AuthorRepositoryMock,
        },
      ],
    }).compile();
    authorController = app.get<AuthorController>(AuthorController);
    authorRepository = app.get<AbstractAuthorRepository>(
      AbstractAuthorRepository,
    );
    name = 'author test';
    authorId = 'fake id';
    author = { id: authorId, name };

    authorRepository.create = jest.fn();
  });

  describe('create an author', () => {
    it('should create author', async () => {
      await authorController.create(author);
      expect(authorRepository.create).toBeCalled();
    });
  });
});

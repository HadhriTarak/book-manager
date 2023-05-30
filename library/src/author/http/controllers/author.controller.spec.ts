import { AbstractAuthorRepository } from '../../database/repositories/author.repository.abstract';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorBusiness } from '../../../../application/author/businessLogic/author.business';
import { Author } from 'application/author/entities/author';
import { AuthorController } from './author.controller';
import { AuthorRepositoryMock } from '../../mocks/repositories/author.repository.mock';
import { AbstractAuthorMqClient } from '../../mq/author.mq.client.abstract';
import { AuthorMqClientMock } from '../../mocks/mq/author.mq.client.mock';
import { CreateAuthorDTO } from '../validation/createAuthor.dto';
import { UpdateAuthorDTO } from '../validation/updateAuthor.dto';
import { NotFoundException } from '@nestjs/common';

describe('AuthorController', () => {
  let app: TestingModule;
  let authorController: AuthorController;
  let authorMqClient: AbstractAuthorMqClient;
  let name: string;
  let author: CreateAuthorDTO;

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
        {
          provide: AbstractAuthorMqClient,
          useClass: AuthorMqClientMock,
        },
      ],
    }).compile();
    authorController = app.get<AuthorController>(AuthorController);
    authorMqClient = app.get<AbstractAuthorMqClient>(AbstractAuthorMqClient);
    authorMqClient.sendNewAuthor = jest.fn();
    authorMqClient.sendUpdatedAuthor = jest.fn();
    name = 'author test';
    author = new CreateAuthorDTO();
    author.name = name;
  });

  describe('create an author', () => {
    it('should create author', async () => {
      const newAuthor: Author = await authorController.create(author);
      expect(newAuthor).toHaveProperty('id');
      expect(newAuthor).toHaveProperty('name');
      expect(newAuthor.name).toEqual(author.name);
      expect(authorMqClient.sendNewAuthor).toBeCalled();
    });
  });

  describe('update an author', () => {
    it('should not update author', async () => {
      await authorController.create(author);
      const wrongId = 'wrongId';
      const updateData = new UpdateAuthorDTO();
      updateData.name = 'updated author';
      try {
        await authorController.update(wrongId, updateData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should update author', async () => {
      const newAuthor: Author = await authorController.create(author);
      const updateData = new UpdateAuthorDTO();
      updateData.name = 'updated author';

      const updatedAuthor = await authorController.update(
        newAuthor.id,
        updateData,
      );
      expect(updatedAuthor).toHaveProperty('id');
      expect(updatedAuthor).toHaveProperty('name');
      expect(updatedAuthor.name).toEqual(updateData.name);
      expect(authorMqClient.sendUpdatedAuthor).toBeCalledTimes(1);
    });
  });

  describe('list authors', () => {
    it('should get authors list', async () => {
      await Promise.all([
        authorController.create(author),
        authorController.create(author),
      ]);
      const list: Author[] = await authorController.listAll();
      expect(list).toHaveLength(2);
    });
  });

  describe('get one author by id', () => {
    let authorId: string;
    const fakeId = 'fake id';
    it('should not get author', async () => {
      const newAuthor: Author = await authorController.create(author);
      authorId = newAuthor.id;
      try {
        await authorController.getOne(fakeId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('should get author', async () => {
      const newAuthor: Author = await authorController.create(author);
      authorId = newAuthor.id;
      const theAuthor = await authorController.getOne(authorId);
      expect(theAuthor?.name).toEqual(author.name);
    });
  });
});

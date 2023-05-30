import { AuthorMqServiceMock } from '../mocks/author.mq.service.mock';
import { IAuthorMqService } from '../ports/IAuthorMqService';
import { AuthorBusiness } from './author.business';
import { IAuthorRepository } from '../ports/IAuthorRepository';
import { AuthorRepositoryMock } from '../mocks/author.repository.mock';
import { Author } from '../entities/author';

describe('author business', () => {
  let authorBusiness: AuthorBusiness;
  let authorRepository: IAuthorRepository;
  let authorMqService: IAuthorMqService;

  beforeEach(() => {
    authorRepository = new AuthorRepositoryMock();
    authorMqService = new AuthorMqServiceMock();
    authorMqService.sendNewAuthor = jest.fn();
    authorMqService.sendUpdatedAuthor = jest.fn();
    authorBusiness = new AuthorBusiness(authorRepository, authorMqService);
  });

  describe('create', () => {
    const author = {
      name: 'test author',
    };
    it('should create new author', async () => {
      const newAuthor = await authorBusiness.createAuthor(author);
      expect(newAuthor).toHaveProperty('id');
      expect(newAuthor?.name).toEqual(author.name);
      expect(authorMqService.sendNewAuthor).toBeCalled();
    });
  });

  describe('update', () => {
    const oldAuthorData = {
      name: 'test author',
    };
    const oldAuthorData2 = {
      name: 'test author',
    };
    it('should return null', async () => {
      const wrongId = 'wrong id';
      await authorRepository.create(oldAuthorData);
      const updatedData = { name: 'updated author' };
      await authorBusiness.updateAuthor(wrongId, updatedData);
      const updatedAuthor = await authorRepository.getOneById(wrongId);
      expect(updatedAuthor).toBeUndefined();
      expect(authorMqService.sendUpdatedAuthor).toBeCalledTimes(0);
    });
    it('should update author', async () => {
      const oldAuthor = await authorRepository.create(oldAuthorData2);
      const updatedData = { name: 'updated author' };
      await authorBusiness.updateAuthor(oldAuthor.id, updatedData);
      const updatedAuthor = await authorRepository.getOneById(oldAuthor.id);
      expect(updatedAuthor?.name).toEqual(updatedData.name);
      expect(authorMqService.sendUpdatedAuthor).toBeCalled();
    });
  });

  describe('listAll', () => {
    const author1 = {
      name: 'author 1',
    };
    const author2 = {
      name: 'author 2',
    };
    it('should list all authors', async () => {
      await authorBusiness.createAuthor(author1);
      await authorBusiness.createAuthor(author2);
      const list = await authorBusiness.listAll();
      expect(list).toHaveLength(2);
    });
  });

  describe('getOne', () => {
    const author1Data = {
      name: 'author 1',
    };
    const author2Data = {
      name: 'author 2',
    };
    let fakeAuthor: Author | null;
    it('should get one author by id', async () => {
      const [author1, author2] = await Promise.all([
        authorBusiness.createAuthor(author1Data),
        authorBusiness.createAuthor(author2Data),
      ]);
      const listedAuthor1 = await authorBusiness.getOne(author1.id);
      const listedAuthor2 = await authorBusiness.getOne(author2.id);
      expect(listedAuthor1?.name).toEqual(author1Data.name);
      expect(listedAuthor2?.name).toEqual(author2Data.name);
      const fakeId = 'fake id';

      try {
        fakeAuthor = await authorBusiness.getOne(fakeId);
      } catch (error) {
        expect(fakeAuthor).toBeNull();
      }
    });
  });
});

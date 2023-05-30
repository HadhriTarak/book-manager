import { AuthorBusiness } from './author.business';
import { IAuthorRepository } from '../ports/IAuthorRepository';
import { AuthorRepositoryMock } from '../mocks/author.repository.mock';
import { Author } from '../entities/author';

describe('author business', () => {
  let authorBusiness: AuthorBusiness;
  let authorRepository: IAuthorRepository;
  let author: Author;
  let newAuthor: Author;

  beforeEach(() => {
    authorRepository = new AuthorRepositoryMock();
    authorBusiness = new AuthorBusiness(authorRepository);
    author = {
      name: 'test author',
    };
  });

  describe('create', () => {
    it('should create new author', async () => {
      newAuthor = await authorBusiness.createAuthor(author);
      expect(newAuthor).toHaveProperty('id');
      expect(newAuthor?.name).toEqual(author.name);
    });
  });
});

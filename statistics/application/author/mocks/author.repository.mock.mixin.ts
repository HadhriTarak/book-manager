import { Constructor } from '../../../utils/types/constructor';
import { Author } from '../entities/author';
import { IAuthorRepository } from '../ports/IAuthorRepository';

export function AuthorRepositoryMockMixin<TBase extends Constructor>(
  Base: TBase,
) {
  return class AuthorRepositoryMock extends Base implements IAuthorRepository {
    authors: Author[] = [];

    constructor(...args: any[]) {
      super(args);
      this.authors = [];
    }

    async create(author: Author) {
      const newAuthor = {
        id: (Math.random() + 1).toString(36).substring(7),
        ...author,
      };
      this.authors.push(newAuthor);
      return Promise.resolve(newAuthor);
    }

    async list() {
      return this.authors;
    }

    async getOneById(id) {
      return Promise.resolve(this.authors.find((elem) => elem.id === id));
    }
  };
}

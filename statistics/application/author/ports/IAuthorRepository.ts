import { Author } from '../entities/author';

export interface IAuthorRepository {
  create: (author: Author) => Promise<Author>;
  list: () => Promise<Author[]>;
  getOneById: (id: string) => Promise<Author>;
}

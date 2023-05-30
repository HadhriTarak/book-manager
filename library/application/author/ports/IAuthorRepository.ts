import { Author } from '../entities/author';

export interface IAuthorRepository {
  create: (author: Author) => Promise<Author>;
  update: (id: string, author: Author) => Promise<Author | null>;
  listAll: () => Promise<Author[]>;
  getOneById: (id: string) => Promise<Author>;
}

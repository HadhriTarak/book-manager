import { Author } from '../entities/author';

export interface IAuthorBusiness {
  createAuthor: (author: Author) => Promise<Author>;
  updateAuthor: (id: string, author: Author) => Promise<Author | null>;
  listAll: () => Promise<Author[]>;
  getOne: (id: string) => Promise<Author | null>;
}

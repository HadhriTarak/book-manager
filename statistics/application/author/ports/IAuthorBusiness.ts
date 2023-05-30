import { Author } from '../entities/author';

export interface IAuthorBusiness {
  createAuthor: (author: Author) => Promise<Author>;
}

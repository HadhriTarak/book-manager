import { Author } from '../entities/author';

export interface IAuthorMqService {
  sendNewAuthor: (author: Author) => void;
  sendUpdatedAuthor: (author: Author) => void;
}

import { Book } from '../entities/book';

export interface IBookMqService {
  sendNewBook: (book: Book) => void;
}

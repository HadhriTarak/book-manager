import { Injectable } from '@nestjs/common';
import { Book } from 'application/book/entities/book';
import { IBookRepository } from 'application/book/ports/IBookRepository';

@Injectable()
export abstract class AbstractBookRepository implements IBookRepository {
  public abstract create: (book: Book) => Promise<Book>;
}

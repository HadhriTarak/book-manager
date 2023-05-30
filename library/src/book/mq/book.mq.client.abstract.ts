import { Injectable } from '@nestjs/common';
import { Book } from 'application/book/entities/book';
import { IBookMqService } from 'application/book/ports/IBookMqService';

@Injectable()
export abstract class AbstractBookMqService implements IBookMqService {
  public abstract sendNewBook: (book: Book) => void;
}

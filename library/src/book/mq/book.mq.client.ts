import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Book } from 'application/book/entities/book';
import { AbstractBookMqService } from './book.mq.client.abstract';

export class BookMqService extends AbstractBookMqService {
  constructor(@Inject('BOOK_SERVICE') private bookMqClientProxy: ClientProxy) {
    super();
  }

  sendNewBook = (book: Book) => {
    this.bookMqClientProxy.emit({ cmd: 'new-book' }, book);
  };
}

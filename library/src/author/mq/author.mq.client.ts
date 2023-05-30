import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Author } from 'application/author/entities/author';
import { AbstractAuthorMqClient } from './author.mq.client.abstract';

export class AuthorMqClient extends AbstractAuthorMqClient {
  constructor(
    @Inject('AUTHOR_SERVICE') private authorMqClientProxy: ClientProxy,
  ) {
    super();
  }

  sendNewAuthor = (author: Author) => {
    this.authorMqClientProxy.emit({ cmd: 'new-author' }, author);
  };

  sendUpdatedAuthor = (author: Author) => {
    this.authorMqClientProxy.emit({ cmd: 'updated-author' }, author);
  };
}

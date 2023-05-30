import { Injectable } from '@nestjs/common';
import { Author } from 'application/author/entities/author';
import { IAuthorMqService } from 'application/author/ports/IAuthorMqService';

@Injectable()
export abstract class AbstractAuthorMqClient implements IAuthorMqService {
  public abstract sendNewAuthor: (author: Author) => void;
  public abstract sendUpdatedAuthor: (author: Author) => void;
}

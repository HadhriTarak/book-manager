import { Injectable } from '@nestjs/common';
import { Author } from 'application/author/entities/author';
import { IAuthorRepository } from 'application/author/ports/IAuthorRepository';

@Injectable()
export abstract class AbstractAuthorRepository implements IAuthorRepository {
  public abstract create: (author: Author) => Promise<Author>;
  public abstract update: (
    id: string,
    author: Author,
  ) => Promise<Author | null>;
  public abstract listAll: () => Promise<Author[]>;
  public abstract getOneById: (id: string) => Promise<Author>;
}

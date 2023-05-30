import { Injectable } from '@nestjs/common';
import { Author } from '../../../../application/author/entities/author';
import { AuthorDAO } from '../schemas/author.schema';
import { Types } from 'mongoose';

@Injectable()
export class AuthorDataMapper {
  public static toDb = (author: Author) => {
    const { id, ...rest } = author;
    return { ...(id && { _id: new Types.ObjectId(id) }), ...rest };
  };

  public static fromDB = (author: AuthorDAO) => {
    const { _id, ...rest } = author;
    return { ...(_id && { id: _id.toString() }), ...rest } as Author;
  };
}

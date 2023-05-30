import { AuthorDataMapper } from './author.mapper';
import { Author } from '../../../../application/author/entities/author';
import { AuthorDAO } from '../schemas/author.schema';
import { Types } from 'mongoose';

describe('author mapper tests', () => {
  it('should return AuthorDAO type', () => {
    const id = new Types.ObjectId();
    const author: Author = { id: id.toString(), name: 'author test' };
    const newAuthor = AuthorDataMapper.toDb(author);
    const expectedResult = { _id: id, name: 'author test' };
    expect(newAuthor).toEqual(expectedResult);
  });

  it('should return Author type', () => {
    const id = new Types.ObjectId();
    const name = 'author test';
    const author: AuthorDAO = {
      _id: id,
      name,
    };
    const expectedResult = {
      id: id.toString(),
      name,
    };
    const newAuthor = AuthorDataMapper.fromDB(author);
    expect(newAuthor).toEqual(expectedResult);
  });
});

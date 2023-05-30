import { Author } from '../entities/author';
import { IAuthorBusiness } from '../ports/IAuthorBusiness';
import { IAuthorRepository } from '../ports/IAuthorRepository';

export class AuthorBusiness implements IAuthorBusiness {
  private authorRepository: IAuthorRepository;
  constructor(authorRepository: IAuthorRepository) {
    this.authorRepository = authorRepository;
  }

  public createAuthor = async (author: Author) => {
    return this.authorRepository.create(author);
  };
}

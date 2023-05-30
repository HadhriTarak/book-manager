import { Author } from '../entities/author';
import { IAuthorBusiness } from '../ports/IAuthorBusiness';
import { IAuthorMqService } from '../ports/IAuthorMqService';
import { IAuthorRepository } from '../ports/IAuthorRepository';

export class AuthorBusiness implements IAuthorBusiness {
  constructor(
    private authorRepository: IAuthorRepository,
    private authorMqService: IAuthorMqService,
  ) {}

  public createAuthor = async (author: Author) => {
    const newAuthor: Author = await this.authorRepository.create(author);
    await this.authorMqService.sendNewAuthor(newAuthor);
    return newAuthor;
  };

  public updateAuthor = async (id: string, author: Author) => {
    const updatedAuthor = await this.authorRepository.update(id, author);
    if (updatedAuthor) {
      this.authorMqService.sendUpdatedAuthor(updatedAuthor);
    }
    return updatedAuthor;
  };

  public listAll = async () => {
    return this.authorRepository.listAll();
  };

  public getOne = async (id) => this.authorRepository.getOneById(id);
}

import { Constructor } from '../../../utils/types/constructor';
import { Author } from '../entities/author';
import { IAuthorMqService } from '../ports/IAuthorMqService';
export function AuthorMqServiceMockMixin<Tbase extends Constructor>(
  Base: Tbase,
) {
  return class AuthorMqServiceMock extends Base implements IAuthorMqService {
    authors: Author[] = [];
    constructor(...args: any[]) {
      super(args);
    }

    sendNewAuthor = (author: Author) => {
      this.authors.push(author);
    };
    sendUpdatedAuthor = (author: Author) => {
      const index = this.authors.findIndex((elem) => elem.id === author.id);
      if (index > -1) {
        this.authors[index] = { ...author };
      }
    };
  };
}

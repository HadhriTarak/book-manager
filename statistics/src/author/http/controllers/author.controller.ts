import { AbstractAuthorRepository } from '../../database/repositories/author.repository.abstract';
import { Controller } from '@nestjs/common';
import { AuthorBusiness } from '../../../../application/author/businessLogic/author.business';
import { IAuthorBusiness } from '../../../../application/author/ports/IAuthorBusiness';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Author } from '../../../../application/author/entities/author';

@Controller('author')
export class AuthorController {
  private authorBusiness: IAuthorBusiness;
  constructor(private authorRepository: AbstractAuthorRepository) {
    this.authorBusiness = new AuthorBusiness(this.authorRepository);
  }

  @MessagePattern({ cmd: 'new-author' })
  create(@Payload() author: Author) {
    return this.authorBusiness.createAuthor(author);
  }
}

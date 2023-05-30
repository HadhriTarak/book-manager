import { AbstractAuthorRepository } from '../../database/repositories/author.repository.abstract';
import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
  Get,
  HttpCode,
} from '@nestjs/common';
import { AuthorBusiness } from '../../../../application/author/businessLogic/author.business';
import { IAuthorBusiness } from '../../../../application/author/ports/IAuthorBusiness';
import { CreateAuthorDTO } from '../validation/createAuthor.dto';
import { AbstractAuthorMqClient } from '../../mq/author.mq.client.abstract';
import { UpdateAuthorDTO } from '../validation/updateAuthor.dto';

@Controller('author')
export class AuthorController {
  private authorBusiness: IAuthorBusiness;
  constructor(
    private authorRepository: AbstractAuthorRepository,
    private authorMqClient: AbstractAuthorMqClient,
  ) {
    this.authorBusiness = new AuthorBusiness(
      this.authorRepository,
      this.authorMqClient,
    );
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createAuthorDTO: CreateAuthorDTO) {
    const author = await this.authorBusiness.createAuthor(createAuthorDTO);
    return author;
  }

  @Patch(':id')
  async update(@Param('id') id: string, updateAuthorDTO: UpdateAuthorDTO) {
    const author = await this.authorBusiness.updateAuthor(id, updateAuthorDTO);
    if (author) return author;
    throw new NotFoundException('404 not found');
  }

  @Get('')
  async listAll() {
    return this.authorBusiness.listAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const author = await this.authorBusiness.getOne(id);
    if (author) return author;
    throw new NotFoundException('404 not found');
  }
}

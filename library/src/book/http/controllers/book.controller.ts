import { Body, Controller, Post } from '@nestjs/common';
import { BookBusiness } from '../../../../application/book/businessLogic/book.business';
import { AbstractBookRepository } from '../../database/repositories/book.repository.abstract';
import { CreateBookDTO } from '../validation/createBook.dto';
import { AbstractBookMqService } from '../../mq/book.mq.client.abstract';
import { BookDTOMapper } from '../validation/bookDTO.mapper';

@Controller('book')
export class BookController {
  private bookBusiness: BookBusiness;
  constructor(
    private bookMqService: AbstractBookMqService,
    private bookRepository: AbstractBookRepository,
  ) {
    this.bookBusiness = new BookBusiness(
      this.bookRepository,
      this.bookMqService,
    );
  }

  @Post()
  async create(@Body() createBookDTO: CreateBookDTO) {
    const book = await this.bookBusiness.createBook(
      BookDTOMapper.createBookDTOtoEntity(createBookDTO),
    );
    return book;
  }
}

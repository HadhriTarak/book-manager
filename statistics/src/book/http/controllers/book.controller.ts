import { AbstractBookRepository } from '../../database/repositories/book.repository.abstract';
import { Controller } from '@nestjs/common';
import { BookBusiness } from '../../../../application/book/businessLogic/book.business';
import { Book } from '../../../../application/book/entities/book';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IBookBusiness } from '../../../../application/book/ports/IBookBusiness';

@Controller('book')
export class BookController {
  private bookBusiness: IBookBusiness;
  constructor(private bookRepository: AbstractBookRepository) {
    this.bookBusiness = new BookBusiness(this.bookRepository);
  }

  @MessagePattern({ cmd: 'new-book' })
  async create(@Payload() book: Book) {
    return this.bookBusiness.createBook(book);
  }
}

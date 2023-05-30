import { BookRepository } from '../../database/repositories/book.repository';
import { AbstractBookRepository } from '../../database/repositories/book.repository.abstract';
import { BookSchema } from '../../database/schemas/book.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookBusiness } from 'application/book/businessLogic/book.business';
import { BookDataMapper } from 'src/book/database/mappers/book.mapper';
import { BookController } from '../controllers/book.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  controllers: [BookController],
  providers: [
    { provide: AbstractBookRepository, useClass: BookRepository },
    BookDataMapper,
    BookBusiness,
    MongooseModule,
  ],
})
export class BookModule {}

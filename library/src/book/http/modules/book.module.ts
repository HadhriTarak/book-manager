import { BookDataMapper } from '../../database/mappers/book.mapper';
import { BookRepository } from '../../database/repositories/book.repository';
import { AbstractBookRepository } from '../../database/repositories/book.repository.abstract';
import { BookSchema } from '../../database/schemas/book.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookBusiness } from 'application/book/businessLogic/book.business';
import { BookController } from '../controllers/book.controller';
import { AbstractBookMqService } from '../../mq/book.mq.client.abstract';
import { BookMqService } from '../../mq/book.mq.client';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  controllers: [BookController],
  providers: [
    { provide: AbstractBookRepository, useClass: BookRepository },
    BookDataMapper,
    BookBusiness,
    {
      provide: AbstractBookMqService,
      useClass: BookMqService,
    },
    MongooseModule,
    {
      provide: 'BOOK_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBIT_MQ_URL],
            queue: process.env.RABBIT_MQ_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
    },
  ],
})
export class BookModule {}

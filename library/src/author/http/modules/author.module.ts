import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorController } from '../controllers/author.controller';
import { AbstractAuthorRepository } from '../../database/repositories/author.repository.abstract';
import { AuthorRepository } from '../../database/repositories/author.repository';
import { AuthorBusiness } from 'application/author/businessLogic/author.business';
import { AuthorSchema } from '../../database/schemas/author.schema';
import { AuthorDataMapper } from '../../database/mappers/author.mapper';
import { AbstractAuthorMqClient } from '../../mq/author.mq.client.abstract';
import { AuthorMqClient } from '../../mq/author.mq.client';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
  ],
  controllers: [AuthorController],
  providers: [
    {
      provide: AbstractAuthorRepository,
      useClass: AuthorRepository,
    },
    AuthorDataMapper,
    AuthorBusiness,
    {
      provide: AbstractAuthorMqClient,
      useClass: AuthorMqClient,
    },
    MongooseModule,
    {
      provide: 'AUTHOR_SERVICE',
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
export class AuthorModule {}

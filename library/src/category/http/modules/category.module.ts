import { CategoryDataMapper } from '@App/category/database/mappers/category.mapper';
import { CategoryRepository } from '@App/category/database/repositories/category.repository';
import { AbstractCategoryRepository } from '@App/category/database/repositories/category.repository.abstract';
import { CategorySchema } from '@App/category/database/schemas/category.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryBusiness } from 'application/category/businessLogic/category.business';
import { CategoryController } from '../controllers/category.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CategoryMqClient } from '../../mq/category.mq.client';
import { AbstractCategoryMqClient } from '@App/category/mq/category.mq.client.abstract';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [
    { provide: AbstractCategoryRepository, useClass: CategoryRepository },
    CategoryDataMapper,
    CategoryBusiness,
    {
      provide: AbstractCategoryMqClient,
      useClass: CategoryMqClient,
    },
    MongooseModule,
    {
      provide: 'CATEGORY_SERVICE',
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
export class CategoryModule {}

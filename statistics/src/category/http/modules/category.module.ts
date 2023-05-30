import { CategoryDataMapper } from '../../database/mappers/category.mapper';
import { CategoryRepository } from '../../database/repositories/category.repository';
import { AbstractCategoryRepository } from '../../database/repositories/category.repository.abstract';
import { CategorySchema } from '../../database/schemas/category.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryBusiness } from 'application/category/businessLogic/category.business';
import { CategoryController } from '../controllers/category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [
    { provide: AbstractCategoryRepository, useClass: CategoryRepository },
    CategoryDataMapper,
    CategoryBusiness,
    MongooseModule,
  ],
})
export class CategoryModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../../../application/category/entities/category';
import { Model } from 'mongoose';
import { CategoryDataMapper } from '../mappers/category.mapper';
import { CategoryDocument } from '../schemas/category.schema';
import { AbstractCategoryRepository } from './category.repository.abstract';

@Injectable()
export class CategoryRepository extends AbstractCategoryRepository {
  constructor(
    @InjectModel('Category') private categoryModel: Model<CategoryDocument>,
  ) {
    super();
  }

  create = async (category: Category) => {
    const createdCategory = new this.categoryModel(category);
    await createdCategory.save();
    const result = await this.categoryModel
      .findById(createdCategory._id)
      .lean();
    return CategoryDataMapper.fromDb(result);
  };

  update = async (id: string, category: Category) => {
    const updatedCategory = await this.categoryModel.findOneAndUpdate(
      { _id: id },
      category,
    );
    return updatedCategory ? CategoryDataMapper.fromDb(updatedCategory) : null;
  };

  listAll = async () => {
    const list = await this.categoryModel.find().lean();
    return list.map((category) => CategoryDataMapper.fromDb(category));
  };

  public getOneById = async (id: string) => {
    const category = await this.categoryModel.findById(id).lean();
    return CategoryDataMapper.fromDb(category);
  };
}

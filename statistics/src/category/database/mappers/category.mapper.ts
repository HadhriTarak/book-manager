import { Injectable } from '@nestjs/common';
import { Category } from 'application/category/entities/category';
import { Types } from 'mongoose';
import { CategoryDAO } from '../schemas/category.schema';

@Injectable()
export class CategoryDataMapper {
  public static toDb = (category: Category) => {
    const { id, ...rest } = category;
    return { ...(id && { _id: new Types.ObjectId(id) }), ...rest };
  };

  public static fromDb = (category: CategoryDAO) => {
    const { _id, ...rest } = category;
    return { ...(_id && { id: _id.toString() }), ...rest };
  };
}

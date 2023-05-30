import { CategoryDataMapper } from './category.mapper';
import { Category } from '../../../../application/category/entities/category';
import { CategoryDAO } from '../schemas/category.schema';
import { Types } from 'mongoose';

describe('category mapper tests', () => {
  let id: Types.ObjectId;
  let name: string;
  beforeEach(() => {
    id = new Types.ObjectId();
    name = 'category test';
  });
  it('should return CategoryDAO type', () => {
    const category: Category = {
      id: id.toString(),
      name,
    };
    const newCategory = CategoryDataMapper.toDb(category);
    const expectedResult = { _id: id, name };
    expect(newCategory).toEqual(expectedResult);
  });

  it('should return Category type', () => {
    const category: CategoryDAO = {
      _id: id,
      name,
    };

    const expectedResult = {
      id: id.toString(),
      name,
    };

    const newCategory = CategoryDataMapper.fromDb(category);
    expect(newCategory).toEqual(expectedResult);
  });
});

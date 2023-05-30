import { Category } from '../entities/category';

export interface ICategoryBusiness {
  createCategory: (category: Category) => Promise<void>;
}

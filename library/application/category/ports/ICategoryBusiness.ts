import { Category } from '../entities/category';

export interface ICategoryBusiness {
  createCategory: (category: Category) => Promise<Category>;
  updateCategory: (id: string, category: Category) => Promise<Category | null>;
  listAll: () => Promise<Category[]>;
  getOne: (id: string) => Promise<Category | null>;
}

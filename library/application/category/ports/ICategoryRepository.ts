import { Category } from '../entities/category';

export interface ICatagoryRepository {
  create: (category: Category) => Promise<Category>;
  update: (id: string, category: Category) => Promise<Category | null>;
  listAll: () => Promise<Category[]>;
  getOneById: (id: string) => Promise<Category>;
}

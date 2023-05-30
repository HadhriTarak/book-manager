import { Category } from '../entities/category';

export interface ICategoryMqService {
  sendNewCategory: (category: Category) => void;
  sendUpdatedCategory: (category: Category) => void;
}

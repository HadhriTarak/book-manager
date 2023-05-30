import { Author } from 'application/author/entities/author';
import { Category } from 'application/category/entities/category';

export interface Book {
  id?: string;
  title: string;
  author: Partial<Author>;
  categories: Partial<Category>[];
  addDate?: Date;
}

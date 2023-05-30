import { Injectable } from '@nestjs/common';
import { Category } from 'application/category/entities/category';
import { ICategoryMqService } from 'application/category/ports/ICategoryMqService';

@Injectable()
export abstract class AbstractCategoryMqClient implements ICategoryMqService {
  public abstract sendNewCategory: (category: Category) => void;
  public abstract sendUpdatedCategory: (category: Category) => void;
}

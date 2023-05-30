import { IsString } from 'class-validator';
import { Category } from '../../../../application/category/entities/category';

export class CreateCategoryDTO implements Category {
  @IsString()
  name: string;
}

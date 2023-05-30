import { Book } from 'application/book/entities/book';
import { IsArray, IsString } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  title: string;
  @IsString()
  author: string;
  @IsArray()
  @IsString({ each: true })
  categories: string[];

  toEntity: () => Book = () => ({
    title: this.title,
    author: { id: this.author },
    categories: this.categories.map((category) => ({ id: category })),
  });
}

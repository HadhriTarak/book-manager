import { Injectable } from '@nestjs/common';
import { CreateBookDTO } from './createBook.dto';
import { Book } from '../../../../application/book/entities/book';

@Injectable()
export class BookDTOMapper {
  public static createBookDTOtoEntity: (createBookDTO: CreateBookDTO) => Book =
    (createBookDTO) => {
      return {
        title: createBookDTO.title,
        author: { id: createBookDTO.author },
        categories: createBookDTO.categories.map((category) => ({
          id: category,
        })),
      };
    };
}

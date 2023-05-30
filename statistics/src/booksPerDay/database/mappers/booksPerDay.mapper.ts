import { Injectable } from '@nestjs/common';
import { BooksPerDayDocument } from '../schemas/booksPerDay.schema';
import { BooksPerDay } from 'application/statistics/entities/booksPerDay';

@Injectable()
export class BooksPerDayDataMapper {
  public static fromDB = (record: BooksPerDayDocument) => {
    const copyRecord = { ...record };
    delete copyRecord._id;
    return copyRecord as BooksPerDay;
  };
}

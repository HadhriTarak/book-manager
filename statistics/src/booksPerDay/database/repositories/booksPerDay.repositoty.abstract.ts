import { Injectable } from '@nestjs/common';
import { BooksPerDay } from 'application/statistics/entities/booksPerDay';
import { IBooksPerDayRepository } from 'application/statistics/ports/IBookPerDayRepository';

@Injectable()
export abstract class AbstractBooksPerDayRepository
  implements IBooksPerDayRepository
{
  public abstract calculateRecordByDay: (date: Date) => Promise<void>;
  public abstract getRecordByDay: (date: Date) => Promise<BooksPerDay>;
}

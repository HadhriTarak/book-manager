import { BooksPerDay } from '../entities/booksPerDay';

export interface IBooksPerDayRepository {
  calculateRecordByDay: (date: Date) => Promise<void>;
  getRecordByDay: (date: Date) => Promise<BooksPerDay>;
}

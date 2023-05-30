import { Constructor } from '../../../utils/types/constructor';
import { BooksPerDay } from '../entities/booksPerDay';
import { Book } from '../../book/entities/book';
import { IBooksPerDayRepository } from '../ports/IBookPerDayRepository';

export function BooksPerDayRepositoryMockMixin<TBase extends Constructor>(
  Base: TBase,
) {
  const day1 = new Date();
  const day2 = new Date();
  day1.setDate(day1.getDate() - 2);
  day2.setDate(day2.getDate() - 1);

  return class BooksPerDayRepositoryMock
    extends Base
    implements IBooksPerDayRepository
  {
    books: Book[] = [
      {
        id: 'book 1 id',
        title: 'book 1',
        author: { id: 'author 1' },
        categories: [{ id: 'category 1 id' }, { id: 'category 2 id' }],
        addDate: day1,
      },
      {
        id: 'book 2 id',
        title: 'book 2',
        author: { id: 'author 2' },
        categories: [{ id: 'category 1 id' }, { id: 'category 2 id' }],
        addDate: day1,
      },
      {
        id: 'book 3 id',
        title: 'book 3',
        author: { id: 'author 3' },
        categories: [{ id: 'category 1 id' }, { id: 'category 2 id' }],
        addDate: day2,
      },
    ];

    records: BooksPerDay[] = [
      {
        day: day1,
        totalNumber: 2,
        newBooksNumber: 2,
      },
    ];

    calculateRecordByDay = async (date) => {
      const booksPerDay: BooksPerDay = {
        day: date,
        totalNumber: this.books.length,
        newBooksNumber: this.books.filter(
          (book) => book.addDate.toDateString() === date.toDateString(),
        ).length,
      };

      const index = this.records.findIndex(
        (record) => record.day.toDateString() === date.toDateString(),
      );

      if (index > -1) {
        this.records[index] = booksPerDay;
      } else {
        this.records.push(booksPerDay);
      }
    };

    getRecordByDay = async (date) => {
      return Promise.resolve(
        this.records.find(
          (record) => record.day.toDateString() === date.toDateString(),
        ),
      );
    };
  };
}

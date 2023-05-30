import { BooksPerDay } from '../entities/booksPerDay';
import { BooksPerDayRepositoryMock } from '../mocks/booksPerDay.repository.mock';
import { IBooksPerDayRepository } from '../ports/IBookPerDayRepository';
import { IBooksPerDayBusiness } from '../ports/IBooksPerDayBusiness';
import { BooksPerDayBusiness } from './booksPerDay.business';

describe('books per day business', () => {
  let booksPerDayBusiness: IBooksPerDayBusiness;
  let booksPerDayRepository: IBooksPerDayRepository;

  beforeEach(() => {
    booksPerDayRepository = new BooksPerDayRepositoryMock();
    booksPerDayBusiness = new BooksPerDayBusiness(booksPerDayRepository);
  });

  describe('calculate books numbers per day for the last day', () => {
    it('should calculate books number for the last day', async () => {
      const yesterday: Date = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      await booksPerDayBusiness.calculateYesterdayRecord();
      const yesterdayStatistics: BooksPerDay =
        await booksPerDayRepository.getRecordByDay(yesterday);

      expect(yesterdayStatistics.totalNumber).toBe(3);
      expect(yesterdayStatistics.newBooksNumber).toBe(1);
    });
  });
});

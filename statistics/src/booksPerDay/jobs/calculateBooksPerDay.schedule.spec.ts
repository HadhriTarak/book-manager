import { CalculateBooksPerDaySchedule } from './calculateBooksPerDay.schedule';
import { AbstractBooksPerDayRepository } from '../database/repositories/booksPerDay.repositoty.abstract';
import { BooksPerDay } from '../../../application/statistics/entities/booksPerDay';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksPerDayRepositoryMock } from '../mocks/booksPerDay.repository.mock';

describe('CalculateBooksPerDaySchedule', () => {
  let calculateBooksPerDayScedule: CalculateBooksPerDaySchedule;
  let booksPerDayRepository: AbstractBooksPerDayRepository;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        {
          provide: AbstractBooksPerDayRepository,
          useClass: BooksPerDayRepositoryMock,
        },
      ],
    }).compile();
    booksPerDayRepository = app.get<AbstractBooksPerDayRepository>(
      AbstractBooksPerDayRepository,
    );
    calculateBooksPerDayScedule = new CalculateBooksPerDaySchedule(
      booksPerDayRepository,
    );
  });
  describe('handle cron', () => {
    it('should calculate new books of yesterday', async () => {
      const yesterday: Date = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      await calculateBooksPerDayScedule.handleCron();
      const yesterdayStatistics: BooksPerDay =
        await booksPerDayRepository.getRecordByDay(yesterday);

      expect(yesterdayStatistics.totalNumber).toBe(3);
      expect(yesterdayStatistics.newBooksNumber).toBe(1);
    });
  });
});

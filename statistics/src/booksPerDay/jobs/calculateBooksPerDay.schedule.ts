import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IBooksPerDayBusiness } from '../../../application/statistics/ports/IBooksPerDayBusiness';
import { BooksPerDayBusiness } from '../../../application/statistics/businessLogic/booksPerDay.business';
import { AbstractBooksPerDayRepository } from '../database/repositories/booksPerDay.repositoty.abstract';

@Injectable()
export class CalculateBooksPerDaySchedule {
  private booksPerDayBusiness: IBooksPerDayBusiness;
  constructor(private booksPerDayRepository: AbstractBooksPerDayRepository) {
    this.booksPerDayBusiness = new BooksPerDayBusiness(
      this.booksPerDayRepository,
    );
  }

  @Cron('1 0 0 * * *')
  handleCron() {
    this.booksPerDayBusiness.calculateYesterdayRecord();
  }
}

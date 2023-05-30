import { IBooksPerDayRepository } from '../ports/IBookPerDayRepository';
import { IBooksPerDayBusiness } from '../ports/IBooksPerDayBusiness';

export class BooksPerDayBusiness implements IBooksPerDayBusiness {
  constructor(private booksPerDayRepository: IBooksPerDayRepository) {}

  public calculateYesterdayRecord = async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    await this.booksPerDayRepository.calculateRecordByDay(yesterday);
  };
}

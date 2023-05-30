import { Injectable } from '@nestjs/common';
import { AbstractBooksPerDayRepository } from './booksPerDay.repositoty.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BooksPerDayDocument } from '../schemas/booksPerDay.schema';
import { BookDocument } from 'src/book/database/schemas/book.schema';
import { BooksPerDay } from 'application/statistics/entities/booksPerDay';
import { BooksPerDayDataMapper } from '../mappers/booksPerDay.mapper';

@Injectable()
export class BooksPerDayRepository extends AbstractBooksPerDayRepository {
  constructor(
    @InjectModel('BooksPerDay')
    private booksPerDayModel: Model<BooksPerDayDocument>,
    @InjectModel('Book') private bookModel: Model<BookDocument>,
  ) {
    super();
  }

  public calculateRecordByDay: (date: Date) => Promise<void> = async (date) => {
    const startDate = new Date(date.toDateString());
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
    const [newBooksNumber, total, existiongRecord] = await Promise.all([
      this.bookModel.countDocuments({
        addDate: { $gte: startDate, $lt: endDate },
      }),
      this.bookModel.countDocuments({ addDate: { $lt: endDate } }),
      this.booksPerDayModel.findOne({ day: startDate }).lean(),
    ]);

    if (existiongRecord) {
      existiongRecord.totalNumber = total;
      existiongRecord.newBooksNumber = newBooksNumber;
      await existiongRecord.save();
    } else {
      const createdRecord = new this.booksPerDayModel({
        day: startDate,
        totalNumber: total,
        newBooksNumber,
      });
      await createdRecord.save();
    }
  };

  public getRecordByDay: (date: Date) => Promise<BooksPerDay> = async (
    date,
  ) => {
    const startDate = new Date(date.toDateString());
    const record = await this.booksPerDayModel
      .findOne({ day: startDate })
      .lean();

    return BooksPerDayDataMapper.fromDB(record);
  };
}

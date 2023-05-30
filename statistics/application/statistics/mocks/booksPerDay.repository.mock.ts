import { EmptyClass } from '../../../utils/classes/emptyClass';
import { BooksPerDayRepositoryMockMixin } from './booksPerDay.repository.mock.mixin';

export const BooksPerDayRepositoryMock =
  BooksPerDayRepositoryMockMixin(EmptyClass);

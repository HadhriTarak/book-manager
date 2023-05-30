import { EmptyClass } from '../../../utils/classes/emptyClass';
import { BooksPerDayRepositoryMockMixin } from '../../../application/statistics/mocks/booksPerDay.repository.mock.mixin';

export const BooksPerDayRepositoryMock =
  BooksPerDayRepositoryMockMixin(EmptyClass);

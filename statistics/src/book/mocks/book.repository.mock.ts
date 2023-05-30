import { EmptyClass } from '../../../utils/classes/emptyClass';
import { BookRepositoryMockMixin } from '../../../application/book/mocks/book.repository.mock.mixin';

export const BookRepositoryMock = BookRepositoryMockMixin(EmptyClass);

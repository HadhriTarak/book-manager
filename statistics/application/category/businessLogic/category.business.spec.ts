import { CategoryRepositoryMock } from '../mocks/category.repository.mock';
import { ICatagoryRepository } from '../ports/ICategoryRepository';
import { CategoryBusiness } from './category.business';

describe('category business', () => {
  let categoryBusiness: CategoryBusiness;
  let categoryRepository: ICatagoryRepository;

  beforeEach(() => {
    categoryRepository = new CategoryRepositoryMock();
    categoryBusiness = new CategoryBusiness(categoryRepository);
  });

  describe('create', () => {
    const category = {
      id: ' fake id',
      name: 'new category',
    };

    it('should create category', async () => {
      categoryRepository.create = jest.fn();
      await categoryBusiness.createCategory(category);
      expect(categoryRepository.create).toBeCalled();
    });
  });
});

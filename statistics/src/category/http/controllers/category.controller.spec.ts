import { AbstractCategoryRepository } from '../../database/repositories/category.repository.abstract';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryBusiness } from '../../../../application/category/businessLogic/category.business';
import { Category } from '../../../../application/category/entities/category';
import { CategoryController } from './category.controller';
import { CategoryRepositoryMock } from '../../mocks/repositories/category.repository.mock';

describe('CategoryController', () => {
  let app: TestingModule;
  let categoryController: CategoryController;
  let categoryRepository: AbstractCategoryRepository;
  let name: string;
  let categoryId: string;
  let category: Category;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [CategoryController],
      providers: [
        CategoryBusiness,
        {
          provide: AbstractCategoryRepository,
          useClass: CategoryRepositoryMock,
        },
      ],
    }).compile();
    categoryController = app.get<CategoryController>(CategoryController);
    categoryRepository = app.get<AbstractCategoryRepository>(
      AbstractCategoryRepository,
    );
    name = 'category test';
    categoryId = 'fake id';
    category = { id: categoryId, name };

    categoryRepository.create = jest.fn();
  });

  describe('create a category', () => {
    it('should create category', async () => {
      await categoryController.create(category);
      expect(categoryRepository.create).toBeCalled();
    });
  });
});

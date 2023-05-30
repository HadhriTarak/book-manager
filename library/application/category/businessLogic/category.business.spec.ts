import { Category } from '../entities/category';
import { CategoryMqServiceMock } from '../mocks/category.mq.service.mock';
import { CategoryRepositoryMock } from '../mocks/category.repository.mock';
import { ICategoryMqService } from '../ports/ICategoryMqService';
import { ICatagoryRepository } from '../ports/ICategoryRepository';
import { CategoryBusiness } from './category.business';

describe('category business', () => {
  let categoryBusiness: CategoryBusiness;
  let categoryRepository: ICatagoryRepository;
  let categoryMqService: ICategoryMqService;

  beforeEach(() => {
    categoryRepository = new CategoryRepositoryMock();
    categoryMqService = new CategoryMqServiceMock();
    categoryMqService.sendNewCategory = jest.fn();
    categoryMqService.sendUpdatedCategory = jest.fn();
    categoryBusiness = new CategoryBusiness(
      categoryRepository,
      categoryMqService,
    );
  });

  describe('create', () => {
    const category = {
      name: 'new category',
    };

    it('should create category', async () => {
      const newCategory = await categoryBusiness.createCategory(category);
      expect(newCategory).toHaveProperty('name');
      expect(newCategory.name).toEqual(category.name);
      expect(newCategory).toHaveProperty('id');
      expect(categoryMqService.sendNewCategory).toBeCalled();
    });
  });

  describe('update', () => {
    const oldCategoryData = {
      name: 'test category',
    };
    const oldCategoryData2 = {
      name: 'test category',
    };
    it('should return null', async () => {
      const wrongId = 'wrong id';
      await categoryRepository.create(oldCategoryData);
      const updatedData = { name: 'updated category' };
      await categoryBusiness.updateCategory(wrongId, updatedData);
      const updatedCategory = await categoryRepository.getOneById(wrongId);
      expect(updatedCategory).toBeUndefined();
      expect(categoryMqService.sendUpdatedCategory).toBeCalledTimes(0);
    });
    it('should update category', async () => {
      const oldCategory = await categoryRepository.create(oldCategoryData2);
      const updatedData = { name: 'updated category' };
      await categoryBusiness.updateCategory(oldCategory.id, updatedData);
      const updatedCategory = await categoryRepository.getOneById(
        oldCategory.id,
      );
      expect(updatedCategory?.name).toEqual(updatedData.name);
      expect(categoryMqService.sendUpdatedCategory).toBeCalled();
    });
  });

  describe('list', () => {
    const category1 = {
      name: 'test category 1',
    };
    const category2 = {
      name: 'test category 1',
    };
    it('should list all categories', async () => {
      categoryBusiness.createCategory(category1);
      categoryBusiness.createCategory(category2);
      const categoriesList = await categoryBusiness.listAll();
      expect(categoriesList).toHaveLength(2);
    });
  });

  describe('getOne', () => {
    const category1Data: Category = {
      name: 'category 1',
    };
    const category2Data: Category = {
      name: 'category 2',
    };

    let fakeCategory: Category | null;
    it('should get one author by id', async () => {
      const [category1, category2] = await Promise.all([
        categoryBusiness.createCategory(category1Data),
        categoryBusiness.createCategory(category2Data),
      ]);
      const listedCategory1 = await categoryBusiness.getOne(category1.id);
      const listedCategory2 = await categoryBusiness.getOne(category2.id);
      expect(listedCategory1?.name).toEqual(category1Data.name);
      expect(listedCategory2?.name).toEqual(category2Data.name);
      const fakeId = 'fake id';

      try {
        fakeCategory = await categoryBusiness.getOne(fakeId);
      } catch (error) {
        expect(fakeCategory).toBeNull();
      }
    });
  });
});

import { AbstractCategoryRepository } from '../../database/repositories/category.repository.abstract';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryBusiness } from '../../../../application/category/businessLogic/category.business';
import { Category } from '../../../../application/category/entities/category';
import { CategoryController } from './category.controller';
import { CategoryRepositoryMock } from '../../mocks/repositories/category.repository.mock';
import { AbstractCategoryMqClient } from '../../mq/category.mq.client.abstract';
import { CategoryMqClientMock } from '../../mocks/mq/category.mq.client.mock';
import { UpdateCategoryDTO } from '../validation/updateCategory.dto';
import { NotFoundException } from '@nestjs/common';

describe('CategoryController', () => {
  let app: TestingModule;
  let categoryController: CategoryController;
  let categoryMqClientMock: AbstractCategoryMqClient;
  let name: string;
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
        {
          provide: AbstractCategoryMqClient,
          useClass: CategoryMqClientMock,
        },
      ],
    }).compile();
    categoryController = app.get<CategoryController>(CategoryController);
    categoryMqClientMock = app.get<AbstractCategoryMqClient>(
      AbstractCategoryMqClient,
    );
    categoryMqClientMock.sendNewCategory = jest.fn();
    categoryMqClientMock.sendUpdatedCategory = jest.fn();
    name = 'category test';
    category = { name };
  });

  describe('create a category', () => {
    it('should create category', async () => {
      const newCategory: Category = await categoryController.create(category);
      expect(newCategory).toHaveProperty('id');
      expect(newCategory).toHaveProperty('name');
      expect(newCategory.name).toEqual(category.name);
      expect(categoryMqClientMock.sendNewCategory).toBeCalled();
    });
  });

  describe('update a category', () => {
    it('should not update category', async () => {
      await categoryController.create(category);
      const wrongId = 'wrongId';
      const updateData = new UpdateCategoryDTO();
      updateData.name = 'updated category';
      try {
        await categoryController.update(wrongId, updateData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should update category', async () => {
      const newCategory: Category = await categoryController.create(category);
      const updateData = new UpdateCategoryDTO();
      updateData.name = 'updated categody';

      const updatedCategory = await categoryController.update(
        newCategory.id,
        updateData,
      );
      expect(updatedCategory).toHaveProperty('id');
      expect(updatedCategory).toHaveProperty('name');
      expect(updatedCategory.name).toEqual(updateData.name);
      expect(categoryMqClientMock.sendUpdatedCategory).toBeCalledTimes(1);
    });
  });

  describe('list categories', () => {
    it('should list categories', async () => {
      await categoryController.create(category);
      const categories = await categoryController.listAll();
      expect(categories).toHaveLength(1);
      expect(categories[0]).toHaveProperty('id');
      expect(categories[0]).toHaveProperty('name');
      expect(categories[0].name).toEqual(category.name);
    });
  });

  describe('get one category by id', () => {
    let categoryId: string;
    const fakeId = 'fake id';
    it('should not get category', async () => {
      const newCategory: Category = await categoryController.create(category);
      categoryId = newCategory.id;
      try {
        await categoryController.getOne(fakeId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('should get category', async () => {
      const newCategory: Category = await categoryController.create(category);
      categoryId = newCategory.id;
      const theCategory = await categoryController.getOne(categoryId);
      expect(theCategory?.name).toEqual(category.name);
    });
  });
});

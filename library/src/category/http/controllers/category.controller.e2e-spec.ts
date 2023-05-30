import { AbstractCategoryRepository } from '../../database/repositories/category.repository.abstract';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryBusiness } from '../../../../application/category/businessLogic/category.business';
import { Category } from '../../../../application/category/entities/category';
import { CategoryController } from './category.controller';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import {
  CategoryModel,
  CategorySchema,
} from '../../database/schemas/category.schema';
import { CategoryRepository } from '../../database/repositories/category.repository';
import { getModelToken } from '@nestjs/mongoose';

describe('cetegory controller e2e', () => {
  let app: TestingModule;
  let categoryController: CategoryController;
  let name: string;
  let category: Category;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let categoryModel: Model<CategoryModel>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    categoryModel = mongoConnection.model('Category', CategorySchema);
    app = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [CategoryController],
      providers: [
        CategoryBusiness,
        {
          provide: AbstractCategoryRepository,
          useClass: CategoryRepository,
        },
        { provide: getModelToken('Category'), useValue: categoryModel },
      ],
    }).compile();
    categoryController = app.get<CategoryController>(CategoryController);
    name = 'category test';
    category = { name };
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('create a category', () => {
    it('should create category', async () => {
      const newCategory: Category = await categoryController.create(category);
      expect(newCategory).toHaveProperty('id');
      expect(newCategory).toHaveProperty('name');
      expect(newCategory.name).toEqual(category.name);
    });
  });
});

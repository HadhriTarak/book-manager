import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Category } from '../../../application/category/entities/category';
import { AbstractCategoryMqClient } from './category.mq.client.abstract';

export class CategoryMqClient extends AbstractCategoryMqClient {
  constructor(
    @Inject('CATEGORY_SERVICE') private categoryMqClientProxy: ClientProxy,
  ) {
    super();
  }

  sendNewCategory = (category: Category) => {
    this.categoryMqClientProxy.emit({ cmd: 'new-category' }, category);
  };
  sendUpdatedCategory = (category: Category) => {
    this.categoryMqClientProxy.emit({ cmd: 'updated-category' }, category);
  };
}

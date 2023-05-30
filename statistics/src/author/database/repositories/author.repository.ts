import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from '../../../../application/author/entities/author';
import { AuthorDataMapper } from '../mappers/author.mapper';
import { AuthorDocument } from '../schemas/author.schema';
import { AbstractAuthorRepository } from './author.repository.abstract';

@Injectable()
export class AuthorRepository extends AbstractAuthorRepository {
  constructor(
    @InjectModel('Author') private authorModel: Model<AuthorDocument>,
  ) {
    super();
  }

  create = async (author: Author) => {
    const createdAuthor = new this.authorModel(AuthorDataMapper.toDb(author));
    await createdAuthor.save();
    const result = await this.authorModel.findById(createdAuthor._id).lean();
    return AuthorDataMapper.fromDB(result);
  };

  list = async () => {
    const list = await this.authorModel.find().lean();
    return list.map((author) => AuthorDataMapper.fromDB(author));
  };

  getOneById = async (id) => {
    const author = await this.authorModel.findById(id).lean();
    return AuthorDataMapper.fromDB(author);
  };
}

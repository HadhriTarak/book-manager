import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthorDocument } from '../schemas/author.schema';
import { Author } from 'application/author/entities/author';
import { AuthorDataMapper } from '../mappers/author.mapper';
import { AbstractAuthorRepository } from './author.repository.abstract';

@Injectable()
export class AuthorRepository extends AbstractAuthorRepository {
  constructor(
    @InjectModel('Author') private authorModel: Model<AuthorDocument>,
  ) {
    super();
  }

  create = async (author: Author) => {
    const createdAuthor = new this.authorModel(author);
    await createdAuthor.save();
    const result = await this.authorModel.findById(createdAuthor._id).lean();
    return AuthorDataMapper.fromDB(result);
  };

  update = async (id: string, author: Author) => {
    const updatedAuthor = await this.authorModel.findOneAndUpdate(
      { _id: id },
      author,
    );
    return updatedAuthor ? AuthorDataMapper.fromDB(updatedAuthor) : null;
  };

  listAll = async () => {
    const list = await this.authorModel.find().lean();
    return list.map((author) => AuthorDataMapper.fromDB(author));
  };

  getOneById = async (id) => {
    const author = await this.authorModel.findById(id).lean();
    return AuthorDataMapper.fromDB(author);
  };
}

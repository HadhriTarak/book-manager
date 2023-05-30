import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorController } from '../controllers/author.controller';
import { AbstractAuthorRepository } from '../../database/repositories/author.repository.abstract';
import { AuthorRepository } from '../../database/repositories/author.repository';
import { AuthorBusiness } from '../../../../application/author/businessLogic/author.business';
import { AuthorSchema } from '../../database/schemas/author.schema';
import { AuthorDataMapper } from '../../database/mappers/author.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
  ],
  controllers: [AuthorController],
  providers: [
    {
      provide: AbstractAuthorRepository,
      useClass: AuthorRepository,
    },
    AuthorDataMapper,
    AuthorBusiness,
    MongooseModule,
  ],
})
export class AuthorModule {}

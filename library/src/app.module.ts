import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorModule } from './author/http/modules/author.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/http/modules/category.module';
import { BookModule } from './book/http/modules/book.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECTION),
    AuthorModule,
    CategoryModule,
    BookModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

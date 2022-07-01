import { Module } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { CategoryController } from '../category/category.controller';
import { DatabaseModule } from '../config/database/database.module';
import { categoryProviders } from '../providers/category.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [...categoryProviders, CategoryService],
})
export class CategoryModule {}

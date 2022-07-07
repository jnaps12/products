import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productProviders } from './product.providers';
import { DatabaseModule } from '../database/database.module';
import { categoryProviders } from '../category/category.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [...productProviders, ...categoryProviders, ProductService],
})
export class ProductModule {}

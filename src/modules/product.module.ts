import { Module } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { ProductController } from '../product/product.controller';
import { productProviders } from '../providers/product.providers';
import { DatabaseModule } from '../config/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [...productProviders, ProductService],
})
export class ProductModule {}

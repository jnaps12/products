import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProductModule, CategoryModule, TypeOrmModule.forFeature()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

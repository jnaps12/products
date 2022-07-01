import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProductModule, CategoryModule, TypeOrmModule.forFeature()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

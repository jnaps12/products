import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '../common/notfound.exception';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,

    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: +createProductDto.category },
    });

    if (!category) {
      throw new NotFoundException('Category', +createProductDto.category);
    }

    const product = await this.productRepository.save(createProductDto);
    return product;
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!product) {
      throw new NotFoundException('Product', id);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product', id);
    }

    const category = await this.categoryRepository.findOne({
      where: { id: +updateProductDto.category },
    });

    if (!category) {
      throw new NotFoundException('Category', +updateProductDto.category);
    }

    await this.productRepository.update({ id }, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product', id);
    }
    await this.productRepository.delete(id);
    return product;
  }
}

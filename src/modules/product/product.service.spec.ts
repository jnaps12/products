import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const productEntityList: Product[] = [
  new Product({
    id: 1,
    name: 'product 1',
    qtStock: 2,
    costValue: 12,
    saleValue: 32,
    barCode: '42318741',
    description: 'product teste',
    productCode: '94jlj32j4',
    categoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new Product({
    id: 2,
    name: 'product 2',
    qtStock: 2,
    costValue: 12,
    saleValue: 32,
    barCode: '42313128741',
    description: 'product teste',
    productCode: '94jlj32j4',
    categoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
];

const data: CreateProductDto = {
  name: 'Irineu',
  qtStock: 2,
  costValue: 2,
  saleValue: 3,
  barCode: '432142142',
  description: 'teste',
  productCode: 'saba31',
  categoryId: 1,
};

const categoryEntity: Category = {
  id: 1,
  name: 'task 1',
  description: 'task 1',
  products: [],
};

const updatedProduct: UpdateProductDto = {
  name: 'Irineu updated',
  qtStock: 2,
  costValue: 2,
  saleValue: 3,
  barCode: '432142142',
  description: 'teste updated',
  productCode: 'saba31',
  categoryId: 1,
};

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: Repository<Product>;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            findOne: jest.fn().mockResolvedValue(categoryEntity),
          },
        },
        {
          provide: getRepositoryToken(Product),
          useValue: {
            save: jest.fn().mockResolvedValue(productEntityList[0]),
            find: jest.fn().mockResolvedValue(productEntityList),
            findOne: jest.fn().mockResolvedValue(productEntityList[0]),
            update: jest.fn().mockResolvedValue(productEntityList[0]),
            remove: jest.fn().mockResolvedValue(productEntityList[0]),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return a product entity list successfully.', async () => {
      const result = await productService.findAll();

      expect(result).toEqual(productEntityList);
      expect(productRepository.find).toHaveBeenCalledTimes(1);
    });

    it('Should throw an exception.', () => {
      jest.spyOn(productRepository, 'find').mockRejectedValueOnce(new Error());

      expect(productService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('Should return Product entity successfully', async () => {
      const result = await productService.findOne(1);

      expect(result).toEqual(productEntityList[0]);
      expect(productRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should throw an Exception.', () => {
      jest
        .spyOn(productRepository, 'findOne')
        .mockRejectedValueOnce(new Error());

      expect(productService.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Should create a product entity item successfully', async () => {
      const result = await productService.create(data);

      expect(result).toEqual(productEntityList[0]);
      expect(categoryRepository.findOne).toHaveBeenCalledTimes(1);
      expect(productRepository.save).toHaveBeenCalledTimes(1);
    });

    it('Should throw an exception', () => {
      jest.spyOn(productRepository, 'save').mockRejectedValueOnce(new Error());

      expect(productService.create(data)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('Should update a Product entity sucessfully', async () => {
      const result = await productService.update(1, updatedProduct);

      expect(result).toEqual(productEntityList[0]);
      expect(productRepository.update).toHaveBeenCalledTimes(1);
    });

    it('Should throw an exception', () => {
      jest
        .spyOn(productRepository, 'update')
        .mockRejectedValueOnce(new Error());

      expect(productService.update(1, updatedProduct)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('Should remove an entity item successfully', async () => {
      const result = await productService.remove(1);

      expect(result).toEqual(productEntityList[0]);
      expect(productRepository.remove).toHaveBeenCalledTimes(1);
    });

    it('Should throw an exception', () => {
      jest
        .spyOn(productRepository, 'remove')
        .mockRejectedValueOnce(new Error());

      expect(productService.remove(1)).rejects.toThrowError();
    });
  });
});

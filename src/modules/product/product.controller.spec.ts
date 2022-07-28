import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
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

const newProductEntity = new Product({
  name: 'product 1',
  qtStock: 2,
  costValue: 12,
  saleValue: 32,
  barCode: '42318741',
  description: 'product teste',
  productCode: '94jlj32j4',
  categoryId: 3,
});

const updatedProductEntity = new Product({
  name: 'product 1 updated',
  qtStock: 2,
  costValue: 12,
  saleValue: 32,
  barCode: '42318741',
  description: 'product teste updated',
  productCode: '94jlj32j4',
  category: new Category({
    id: 1,
    name: 'category teste',
    description: 'teste',
  }),
});

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(productEntityList),
            create: jest.fn().mockResolvedValue(newProductEntity),
            findOne: jest.fn().mockResolvedValue(productEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedProductEntity),
            remove: jest.fn().mockResolvedValue(productEntityList[0]),
          },
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
    expect(productService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a product entity list succefully', async () => {
      const result = await productController.findAll();

      expect(result).toEqual(productEntityList);
    });
  });

  describe('create', () => {
    const body: CreateProductDto = {
      name: 'pivô prisma',
      qtStock: 10,
      costValue: 100.5,
      saleValue: 150.5,
      barCode: '32143253534234',
      description: 'teste',
      productCode: 'PVI1050',
      categoryId: 1,
    };
    it('Should create a new product successfully', async () => {
      const result = await productController.create(body);
      expect(result).toEqual(newProductEntity);
    });

    it('should throw an exception', () => {
      jest.spyOn(productService, 'create').mockRejectedValueOnce(new Error());

      expect(productController.create(body)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('Shoudl get a product entity successfully', async () => {
      const result = await productController.findOne('1');

      expect(result).toEqual(productEntityList[0]);
    });

    it('shoudl throw an exception', () => {
      jest.spyOn(productService, 'findOne').mockRejectedValueOnce(new Error());

      expect(productController.findOne('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const body: UpdateProductDto = {
      name: 'product 1 updated',
      qtStock: 2,
      costValue: 12,
      saleValue: 32,
      barCode: '42318741',
      description: 'product teste updated',
      productCode: '94jlj32j4',
      categoryId: 1,
    };
    it('Should updated a product entity successfully', async () => {
      const result = await productController.update('1', body);

      expect(result).toEqual(updatedProductEntity);
    });

    it('shoudl throw an exception', () => {
      jest.spyOn(productService, 'update').mockRejectedValueOnce(new Error());

      expect(productController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a product entity successfully', async () => {
      const result = await productController.remove('1');

      expect(result).toEqual(productEntityList[0]);
    });

    it('shoudl throw an exception', () => {
      jest.spyOn(productService, 'remove').mockRejectedValueOnce(new Error());

      expect(productController.remove('1')).rejects.toThrowError();
    });
  });
});

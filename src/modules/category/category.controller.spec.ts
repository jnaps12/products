import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

const categoryEntityList: Category[] = [
  new Category({
    id: 1,
    name: 'category 1',
    description: 'descrição categoria 1',
    products: [],
  }),
  new Category({
    id: 2,
    name: 'category 2',
    description: 'descrição categoria 2',
    products: [],
  }),
  new Category({
    id: 3,
    name: 'category 3',
    description: 'descrição categoria 3',
    products: [],
  }),
];

const newCategoryEntity = new Category({
  name: 'New controler',
  description: 'New category description',
});

const updatedCategoryEntity = new Category({
  name: 'category 1 ',
  description: 'category 1 updated',
});

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(categoryEntityList),
            create: jest.fn().mockResolvedValue(newCategoryEntity),
            findOne: jest.fn().mockResolvedValue(categoryEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedCategoryEntity),
            remove: jest.fn().mockResolvedValue(categoryEntityList[0]),
          },
        },
      ],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a category list entity successfully', async () => {
      //Act
      const result = await categoryController.findAll();
      //Assert
      expect(result).toEqual(categoryEntityList);
    });

    // interessante para testar se está retornando error, o findAll não lança erros;
    // it('should throw an exception', () => {
    //   jest.spyOn(categoryService, 'findAll').mockRejectedValueOnce(new Error());

    //   //assert
    //   expect(categoryController.findAll).rejects.toThrowError();
    // });
  });

  describe('create', () => {
    it('Should create a new category successfully', async () => {
      const body: CreateCategoryDto = {
        name: 'New category',
        description: 'New category description',
      };
      const result = await categoryController.create(body);

      expect(result).toEqual(newCategoryEntity);
    });

    it('should throw an exception', () => {
      const body: CreateCategoryDto = {
        name: 'New category',
        description: 'New category description',
      };

      jest.spyOn(categoryService, 'create').mockRejectedValueOnce(new Error());

      expect(categoryController.create(body)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('Should get a category Entity correctly', async () => {
      const result = await categoryController.findOne('1');

      expect(result).toEqual(categoryEntityList[0]);
    });

    it('should throw an exception', () => {
      jest.spyOn(categoryService, 'findOne').mockRejectedValueOnce(new Error());

      expect(categoryController.findOne('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a category successfully', async () => {
      const body: UpdateCategoryDto = {
        name: 'category 1 ',
        description: 'category 1 updated',
      };
      const result = await categoryController.update('1', body);

      expect(result).toEqual(updatedCategoryEntity);
    });

    it('should throw an exception', () => {
      const body: UpdateCategoryDto = {
        name: 'category 1 ',
        description: 'category 1 updated',
      };

      jest.spyOn(categoryService, 'update').mockRejectedValueOnce(new Error());

      expect(categoryController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a category successfully', async () => {
      const result = await categoryController.remove('1');

      expect(result).toEqual(categoryEntityList[0]);
    });

    it('should throw an exception', () => {
      jest.spyOn(categoryService, 'remove').mockRejectedValueOnce(new Error());

      expect(categoryController.remove('1')).rejects.toThrowError();
    });
  });
});

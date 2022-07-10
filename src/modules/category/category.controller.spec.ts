import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

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
            create: jest.fn(),
            findAll: jest.fn().mockResolvedValue(categoryEntityList),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
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

    //   //asset
    //   expect(categoryController.findAll).rejects.toThrowError();
    // });
  });
});

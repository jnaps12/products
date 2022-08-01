import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

const categoryEntityList: Category[] = [
  new Category({ name: 'task 1', description: 'task 1' }),
  new Category({ name: 'task 2', description: 'task 2' }),
  new Category({ name: 'task 3', description: 'task 3' }),
];

const data: CreateCategoryDto = {
  name: 'task 1',
  description: 'task 1',
};

const updatedCategory: UpdateCategoryDto = {
  name: 'task 1 updated',
  description: 'task 1 updated',
};

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            save: jest.fn().mockResolvedValue(categoryEntityList[0]),
            find: jest.fn().mockResolvedValue(categoryEntityList),
            findOne: jest.fn().mockResolvedValue(categoryEntityList[0]),
            update: jest.fn().mockResolvedValue(categoryEntityList[0]),
            remove: jest.fn().mockResolvedValue(categoryEntityList[0]),
          },
        },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return category entity list successfully.', async () => {
      const result = await categoryService.findAll();

      expect(result).toEqual(categoryEntityList);
      expect(categoryRepository.find).toHaveBeenCalledTimes(1);
    });

    it('Shoudl throw an exception', () => {
      jest.spyOn(categoryRepository, 'find').mockRejectedValueOnce(new Error());

      expect(categoryService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('Should return a category entity successfully', async () => {
      const result = await categoryService.findOne(1);

      expect(result).toEqual(categoryEntityList[0]);
      expect(categoryRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should throw an Exception', () => {
      jest
        .spyOn(categoryRepository, 'findOne')
        .mockRejectedValueOnce(new Error());

      expect(categoryService.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Should create a new Category entity item successfully', async () => {
      const result = await categoryService.create(data);

      expect(result).toEqual(categoryEntityList[0]);
      expect(categoryRepository.save).toHaveBeenCalledTimes(1);
    });

    it('Should throw an exception', () => {
      jest.spyOn(categoryRepository, 'save').mockRejectedValueOnce(new Error());

      expect(categoryService.create(data)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('Should update a Category entity successfully', async () => {
      const result = await categoryService.update(1, updatedCategory);

      expect(result).toEqual(categoryEntityList[0]);
      expect(categoryRepository.update).toHaveBeenCalledTimes(1);
    });

    it('Should throw an exception', () => {
      jest
        .spyOn(categoryRepository, 'update')
        .mockRejectedValueOnce(new Error());

      expect(categoryService.update(1, updatedCategory)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('Should remove a Category entity successfully', async () => {
      const result = await categoryService.remove(1);

      expect(result).toEqual(categoryEntityList[0]);
      expect(categoryRepository.remove).toHaveBeenCalledTimes(1);
    });

    it('Should throw an exception', () => {
      jest
        .spyOn(categoryRepository, 'remove')
        .mockRejectedValueOnce(new Error());

      expect(categoryService.remove(1)).rejects.toThrowError();
    });
  });
});

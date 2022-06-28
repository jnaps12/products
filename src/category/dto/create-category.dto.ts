import { IsNotEmpty, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @Length(5, 255)
  description?: string;
}

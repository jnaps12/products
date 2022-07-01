import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';

@Exclude()
export class CreateCategoryDto {
  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @Length(5, 255)
  description?: string;
}

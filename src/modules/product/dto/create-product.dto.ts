import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Category } from 'src/modules/category/entities/category.entity';

@Exclude()
export class CreateProductDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  qt_stock: number;

  @Expose()
  @IsNotEmpty()
  // @IsDecimal({ force_decimal: false, decimal_digits: '1, ', locale: 'pt-BR' })
  cost_value: number;

  @Expose()
  @Min(0)
  @IsOptional()
  // @IsDecimal({ force_decimal: false, decimal_digits: '1, ', locale: 'pt-BR' })
  sale_value?: number;

  @Expose()
  @IsString()
  @IsOptional()
  bar_code?: string;

  @Expose()
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  @IsString()
  @IsOptional()
  product_code?: string;

  @Expose()
  @IsNotEmpty()
  category: Category;
}

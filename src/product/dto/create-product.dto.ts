import { IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  qt_stock: number;

  @IsNotEmpty()
  // @IsDecimal({ force_decimal: false, decimal_digits: '1, ', locale: 'pt-BR' })
  cost_value: number;

  @Min(0)
  @IsOptional()
  // @IsDecimal({ force_decimal: false, decimal_digits: '1, ', locale: 'pt-BR' })
  sale_value?: number;

  @IsString()
  @IsOptional()
  bar_code?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  product_code?: string;

  @IsNotEmpty()
  category: Category;
}

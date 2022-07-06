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
  qtStock: number;

  @Expose()
  @IsNotEmpty()
  // @IsDecimal({ force_decimal: false, decimal_digits: '1, ', locale: 'pt-BR' })
  costValue: number;

  @Expose()
  @Min(0)
  @IsOptional()
  // @IsDecimal({ force_decimal: false, decimal_digits: '1, ', locale: 'pt-BR' })
  saleValue?: number;

  @Expose()
  @IsString()
  @IsOptional()
  barCode?: string;

  @Expose()
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  @IsString()
  @IsOptional()
  productCode?: string;

  @Expose()
  @IsNotEmpty()
  category: Category;
}

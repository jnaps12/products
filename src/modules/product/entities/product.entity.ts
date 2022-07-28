import { Category } from '../../category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'qt_stock' })
  qtStock: number;

  @Column('decimal', { name: 'cost_value' })
  costValue: number;

  @Column('decimal', {
    nullable: true,
    name: 'sale_value',
  })
  saleValue: number;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'bar_code' })
  barCode: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'product_code',
  })
  productCode: string;

  @Column({ name: 'category_fk' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_fk' })
  category: Category;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  updatedAt: Date;

  constructor(product?: Partial<Product>) {
    this.id = product?.id;
    this.name = product?.name;
    this.qtStock = product?.qtStock;
    this.costValue = product?.costValue;
    this.saleValue = product?.saleValue;
    this.barCode = product?.barCode;
    this.description = product?.description;
    this.productCode = product?.productCode;
    this.categoryId = product?.categoryId;
    this.createdAt = product?.createdAt;
    this.updatedAt = product?.updatedAt;
  }
}

import { Category } from '../../category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  qtStock: number;

  @Column('decimal', { precision: 5, scale: 2 })
  costValue: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  saleValue: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  barCode: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  productCode: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}

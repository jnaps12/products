import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;

  @OneToMany(() => Product, (product) => product.category, {
    cascade: true,
  })
  products: Product[];

  constructor(category?: Partial<Category>) {
    this.id = category?.id;
    this.name = category?.name;
    this.description = category?.description;
    this.products = category?.products;
  }
}

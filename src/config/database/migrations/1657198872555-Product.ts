import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { createdAtColumn } from '../utils/columns/createdAt';
import { idColumn } from '../utils/columns/id';
import { updatedAtColumn } from '../utils/columns/updatedAt';

export class Product1657198872555 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'qt_stock',
            type: 'int',
          },
          {
            name: 'cost_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'sale_value',
            type: 'decimal',
            isNullable: true,
            precision: 10,
            scale: 2,
          },
          {
            name: 'bar_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'product_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'category_fk',
            type: 'int',
          },
          createdAtColumn,
          updatedAtColumn,
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        columnNames: ['category_fk'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('product');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('category_fk') !== -1,
    );
    await queryRunner.dropForeignKey('product', foreignKey);
    await queryRunner.dropColumn('product', 'category_fk');
    await queryRunner.dropTable('product');
  }
}

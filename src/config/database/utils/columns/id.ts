import { TableColumn } from 'typeorm';

export const idColumn = {
  name: 'id',
  type: 'int',
  isPrimary: true,
  isGenerated: true,
  generationStrategy: 'increment',
} as TableColumn;

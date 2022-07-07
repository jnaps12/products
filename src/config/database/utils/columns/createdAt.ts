import { TableColumn } from 'typeorm';

export const createdAtColumn = {
  name: 'created_at',
  type: 'timestamp',
  default: 'now()',
} as TableColumn;

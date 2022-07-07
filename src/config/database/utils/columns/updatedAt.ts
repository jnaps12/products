import { TableColumn } from 'typeorm';

export const updatedAtColumn = {
  name: 'updated_at',
  type: 'timestamp',
  default: 'now()',
} as TableColumn;

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { join } from 'path';

export const dbConfig = {
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [
    join(__dirname, './../../config/database/migrations/**/*{.ts,.js}'),
  ],
} as TypeOrmModuleOptions;

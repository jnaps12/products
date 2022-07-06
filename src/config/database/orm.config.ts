import { DataSource } from 'typeorm';
import 'dotenv/config';
import { join } from 'path';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [join(__dirname, './migrations/**/*{.ts,.js}')],
  migrationsRun: true,
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => dataSource.initialize(),
  },
];

export default dataSource;

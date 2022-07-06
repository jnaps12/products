import { DataSource } from 'typeorm';
import 'dotenv/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: false,
        migrations: ['src/db/migrations/*.{.ts, .js}'],
        migrationsRun: true,
      });

      return dataSource.initialize();
    },
  },
];

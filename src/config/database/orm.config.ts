import { DataSource } from 'typeorm';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: process.env.DB_CONNECTION,
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'oficina',
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];

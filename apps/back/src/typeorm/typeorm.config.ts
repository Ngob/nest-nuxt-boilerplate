import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
// Please consult https://www.thisdot.co/blog/setting-up-typeorm-migrations-in-an-nx-nestjs-project/
// https://dev.to/amirfakour/using-typeorm-migration-in-nestjs-with-postgres-database-3c75
const config = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/src/**/*.entity{.ts,.js}'], // this may have to be updated. It is usefull for the typeorm cli. It may create issues with deleted files (You may delete file in the src/ directory but it wont be deleted in the dist directory)
  migrations: ['dist/migrations/*{.ts,.js}'], // this may have to be updated. It is usefull for the typeorm cli. It may create issues with deleted files (You may delete file in the src/ directory but it wont be deleted in the dist directory)
  autoLoadEntities: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);

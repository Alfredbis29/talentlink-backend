import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { existsSync } from 'fs';
import { join } from 'path';

// Use SQLite if DB_USE_SQLITE is explicitly set, or if a local dev.sqlite file
// is present (convenience for local development). This prevents accidental
// Postgres connection attempts when developers haven't set up a DB.
const sqliteFile = join(__dirname, '../../dev.sqlite');
const useSqlite = process.env.DB_USE_SQLITE === 'true' || existsSync(sqliteFile);

export const typeOrmConfig: TypeOrmModuleOptions = useSqlite
  ? {
      type: 'sqlite',
      database: process.env.DB_DATABASE || 'dev.sqlite',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }
  : {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'talentlink_dev',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production', // Don't use synchronize in production
    };

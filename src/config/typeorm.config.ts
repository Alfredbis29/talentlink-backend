import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// If DB_USE_SQLITE=true is set, use a local SQLite DB for development so the app
// can run without a Postgres server. This is intentionally opt-in to avoid
// changing production behavior.
const useSqlite = process.env.DB_USE_SQLITE === 'true';

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

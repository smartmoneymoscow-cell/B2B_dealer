import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { validate } from './config/env.validation';
import { DatabaseConfig } from './config/database.config';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CatalogModule } from './catalog/catalog.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ManagersModule } from './managers/managers.module';
import { FilesModule } from './files/files.module';
import { Bitrix24Module } from './bitrix24/bitrix24.module';
import { OnecModule } from './onec/onec.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.THROTTLE_TTL ?? '60', 10) * 1000,
        limit: parseInt(process.env.THROTTLE_LIMIT ?? '100', 10),
      },
    ]),
    CacheModule,
    AuthModule,
    UsersModule,
    CatalogModule,
    InvoicesModule,
    ManagersModule,
    FilesModule,
    Bitrix24Module,
    OnecModule,
  ],
})
export class AppModule {}

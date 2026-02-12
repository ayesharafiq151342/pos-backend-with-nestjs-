import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleModule } from '@nestjs/schedule';

import { WarrantyModule } from './warranty/warranty.module';
import { ProductModule } from './product/product.module';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'db',
      autoLoadEntities: true, // ✅ automatically loads all entities from modules
      synchronize: true,
    }),
      ScheduleModule.forRoot(),
    WarrantyModule,
    ProductModule,
  UploadModule
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesGuard } from './users/decorator-guard/roles.guard';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { WarrantiesModule } from './warranties/warranties.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "nest-dsintes-1",
    autoLoadEntities: true,
    synchronize: true,
  }), ProductsModule, WarrantiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

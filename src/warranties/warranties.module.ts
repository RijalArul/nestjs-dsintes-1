import { Module } from '@nestjs/common';
import { WarrantiesController } from './warranties.controller';
import { WarrantiesService } from './warranties.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { Warranty } from './entity/warranties.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { WarrantiesRepository } from './warranties.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { Product } from 'src/products/entity/products.entitty';

@Module({
  imports: [TypeOrmModule.forFeature([Warranty, Product]), UsersModule, ProductsModule],
  controllers: [WarrantiesController],
  providers: [WarrantiesRepository, WarrantiesService, ProductsRepository],
  exports: [WarrantiesService]
})
export class WarrantiesModule { }

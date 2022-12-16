import { Module } from '@nestjs/common';
import { WarrantiesController } from './warranties.controller';
import { WarrantiesService } from './warranties.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { Warranty } from './entity/warranties.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Warranty]), UsersModule, ProductsModule],
  controllers: [WarrantiesController],
  providers: [WarrantiesService]
})
export class WarrantiesModule { }

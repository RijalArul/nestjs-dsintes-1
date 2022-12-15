import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { Product } from './entity/products.entitty';
import { MulterModule } from '@nestjs/platform-express';
import { ProductsRepository } from './products.repository';


@Module({
    imports: [TypeOrmModule.forFeature([Product]), UsersModule, MulterModule.register({
        dest: './files',
    })],
    controllers: [ProductsController],
    providers: [ProductsRepository, ProductsService],
    exports: [ProductsService]
})
export class ProductsModule { }

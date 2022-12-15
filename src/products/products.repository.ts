import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { Role } from 'src/users/entity/users-role.enum';
import { User } from 'src/users/entity/users.entity';
import { Repository } from "typeorm"
import { CreateProductDTO } from './dto/products.dto';
import { Product } from './entity/products.entitty';
import { WarrantyStatus } from './entity/warranty.enum';

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product)
        private readonly productModel: Repository<Product>
    ) { }

    async create(createProductDto: CreateProductDTO, user: User): Promise<Product> {
        const { name, image_url } = createProductDto
        const newProduct = this.productModel.create({
            name,
            image_url,
            user,
        })

        await this.productModel.save(newProduct)
        return newProduct
    }
}

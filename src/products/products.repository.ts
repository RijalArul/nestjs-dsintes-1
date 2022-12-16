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

    async findAll(): Promise<Product[]> {
        const products = await this.productModel.find({
            relations: {
                user: true
            }
        })

        return products
    }

    async findByName(name: string): Promise<Product> {
        const product = await this.productModel.findOne({
            where: {
                name: name
            }
        })

        return product
    }

    async updateProduct(updateProductDto: CreateProductDTO, user: User, paramName: string): Promise<Product> {
        const { name, image_url } = updateProductDto
        const product = await this.findByName(paramName)
        product.name = name
        product.image_url = image_url
        await this.productModel.update({ name: product.name }, { name: product.name, image_url: product.image_url })
        return product
    }

    async deleteProduct(name: string): Promise<void> {
        await this.findByName(name)
        await this.productModel.delete({ name: name })

        return
    }
}

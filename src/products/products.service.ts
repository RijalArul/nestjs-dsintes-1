import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/users/entity/users.entity';
import { CreateProductDTO } from './dto/products.dto';
import { Product } from './entity/products.entitty';
import { ErrorHandler } from './exception/err-handler.excepton';
import { ProductsRepository } from './products.repository';
import { ProductResponse } from './response/products.response';
import { BodyProductResp, BodyUpdateProductResp } from './web/products-body.response';

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository
    ) {

    }

    async create(createProductDto: CreateProductDTO, user: User, res: Response): Promise<void> {
        try {
            const newProduct = await this.productsRepository.create(createProductDto, user)
            ProductResponse(res, 201, "Success Created Products", BodyProductResp(newProduct))
        } catch (err) {
            const messageErrors = []
            messageErrors.push(`name ${createProductDto.name} already exist`)
            if (err.code === 11000) {
                ErrorHandler(400, messageErrors)
            } else {
                ErrorHandler(500, [])
            }
        }
    }

    async products(): Promise<Product[]> {
        try {
            return await this.productsRepository.findAll()
        } catch (err) {
            ErrorHandler(500, [])
        }
    }

    async update(updateProductDto: CreateProductDTO, user: User, res: Response, paramName: string): Promise<void> {
        try {
            const product = await this.productsRepository.findByName(paramName)
            if (product) {
                const updateProduct = await this.productsRepository.updateProduct(updateProductDto, user, paramName)
                ProductResponse(res, 200, "Updated Product", BodyUpdateProductResp(updateProduct))
            } else {
                throw "Product Not Found"
            }

        } catch (err) {
            const messageErrors = []
            messageErrors.push(err)
            if (err) {
                ErrorHandler(404, messageErrors)
            } else {
                ErrorHandler(500, [])
            }
        }
    }

    async delete(name: string, res: Response): Promise<void> {
        try {
            await this.productsRepository.deleteProduct(name)
            ProductResponse(res, 200, "Deleted Product", "Deleted")
        } catch (err) {
            ErrorHandler(500, [])
        }
    }

}

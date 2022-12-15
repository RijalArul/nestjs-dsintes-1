import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/users/entity/users.entity';
import { CreateProductDTO } from './dto/products.dto';
import { ErrorHandler } from './exception/err-handler.excepton';
import { ProductsRepository } from './products.repository';
import { ProductResponse } from './response/products.response';
import { BodyProductResp } from './web/products-body.response';

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

}

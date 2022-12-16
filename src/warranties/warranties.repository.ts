import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from 'src/products/entity/products.entitty';
import { ProductsRepository } from 'src/products/products.repository';
import { User } from 'src/users/entity/users.entity';
import { Repository } from "typeorm"
import { CreateWarrantyDTO } from './dto/warranties.dto';
import { Warranty } from './entity/warranties.entity';
import { WarrantyRequest, WarrantyStatus } from './entity/warranties.enum';

@Injectable()
export class WarrantiesRepository {
    constructor(
        @InjectRepository(Warranty)
        private readonly warrantyModel: Repository<Warranty>,
        private readonly productRepository: ProductsRepository
    ) {
    }
    async create(createWarrantyDto: CreateWarrantyDTO, productName: string, user: User): Promise<Warranty> {
        const { request, name } = createWarrantyDto
        const product = await this.productRepository.findByName(productName)
        const newWarrant = this.warrantyModel.create({
            name,
            request: request === "repair" ? WarrantyRequest.REPAIR : WarrantyRequest.UPGRADE,
            status: WarrantyStatus.WAITING,
            user: user,
            product: product
        })
        await this.warrantyModel.save(newWarrant)
        return newWarrant
    }
}

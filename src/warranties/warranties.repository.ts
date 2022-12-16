import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from 'src/products/entity/products.entitty';
import { ProductsRepository } from 'src/products/products.repository';
import { User } from 'src/users/entity/users.entity';
import { Repository } from "typeorm"
import { CreateWarrantyDTO, UpdateWarrantyDTO } from './dto/warranties.dto';
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

    async findAll(): Promise<Warranty[]> {
        const warranties = await this.warrantyModel.find()
        return warranties
    }

    async findByName(paramName: string): Promise<Warranty> {
        return await this.warrantyModel.findOne({
            where: {
                name: paramName
            }
        })
    }

    async update(updateWarrantyDTO: UpdateWarrantyDTO, paramName: string): Promise<Warranty> {
        const { status } = updateWarrantyDTO
        const warrant = await this.findByName(paramName)
        warrant.status = status === "accepted" ? WarrantyStatus.ACCEPTED : WarrantyStatus.REJECTED
        await this.warrantyModel.update({ name: paramName }, { status: warrant.status })
        return warrant
    }
}

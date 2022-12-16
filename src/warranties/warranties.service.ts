import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/users/entity/users.entity';
import { CreateWarrantyDTO } from './dto/warranties.dto';
import { Warranty } from './entity/warranties.entity';
import { ErrorHandler } from './exception/err-handler.excepton';
import { WarrantResponse } from './response/warranties.response';
import { WarrantiesRepository } from './warranties.repository';
import { BodyWarrantrResp } from './web/warranties-body.response';

@Injectable()
export class WarrantiesService {
    constructor(
        private readonly warrantiesRepository: WarrantiesRepository
    ) { }

    async create(createWarrantyDto: CreateWarrantyDTO, res: Response, productName: string, user: User): Promise<void> {
        try {
            const newWarrant = await this.warrantiesRepository.create(createWarrantyDto, productName, user)
            WarrantResponse(res, 201, "Successful created warrant", BodyWarrantrResp(newWarrant))
        } catch (err) {
            const messageErrors = []
            messageErrors.push(`name ${createWarrantyDto.name} already exist`)
            if (err.code === 11000) {
                ErrorHandler(400, messageErrors)
            } else {
                ErrorHandler(500, [])
            }
        }
    }
}

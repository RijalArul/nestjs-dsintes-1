import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/users/entity/users.entity';
import { CreateWarrantyDTO, UpdateWarrantyDTO } from './dto/warranties.dto';
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

    async getAllWarranty(res: Response): Promise<void> {
        try {
            const warranties = await this.warrantiesRepository.findAll();
            WarrantResponse(res, 200, "Successful warranties", warranties)
        } catch (err) {
            ErrorHandler(500, [])

        }
    }

    async updateWarranty(updateWarrantyDTO: UpdateWarrantyDTO, res: Response, paramName: string): Promise<void> {
        try {

            const updateWarrant = await this.warrantiesRepository.update(updateWarrantyDTO, paramName)

            if (updateWarrant) {

                WarrantResponse(res, 200, "Successful updated warrant", updateWarrant)
            } else {
                throw "Not Found"
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
}

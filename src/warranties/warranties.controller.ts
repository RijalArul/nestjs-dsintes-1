import { Body, Controller, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserData } from 'src/users/decorator-guard/get-auth.decorator';
import { Roles } from 'src/users/decorator-guard/roles.decorator';
import { RolesGuard } from 'src/users/decorator-guard/roles.guard';
import { Role } from 'src/users/entity/users-role.enum';
import { User } from 'src/users/entity/users.entity';
import { JwtAuthGuard } from 'src/users/jwt/jwt-auth.guard';
import { CreateWarrantyDTO, UpdateWarrantyDTO } from './dto/warranties.dto';
import { WarrantiesService } from './warranties.service';

@Controller('warranties')
export class WarrantiesController {
    constructor(
        private readonly warrantiesService: WarrantiesService
    ) { }

    @Roles(Role.CUSTOMER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(":productName")
    async createRequest(@Param("productName") productName: string, @Body() createWarrantDto: CreateWarrantyDTO, @UserData() user: User, @Res() res: Response): Promise<void> {
        return await this.warrantiesService.create(createWarrantDto, res, productName, user)
    }

    @Roles(Role.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("status/:name")
    async updateStatus(@Param("name") name: string, @Body() updateWarrantDto: UpdateWarrantyDTO, @Res() res: Response): Promise<void> {
        return await this.warrantiesService.updateWarranty(updateWarrantDto, res, name)
    }

    @Roles(Role.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getWarranties(@Res() res: Response): Promise<void> {
        return await this.warrantiesService.getAllWarranty(res)
    }
}

import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { response, Response } from 'express';
import { CreateUserDTO } from './dto/users.dto';
import { User } from './entity/users.entity';
import { UserResponse } from './response/users.response';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) {

    }

    @Get()
    async getUsers(@Res() response: Response): Promise<void> {
        const users = await this.userService.getUsers()
        UserResponse(response, 200, "Success All Users", users)
    }

    @Post('/register/staff')
    async registerStaff(@Body() createUserDto: CreateUserDTO, @Res() response: Response): Promise<void> {
        return this.userService.registerStaff(createUserDto, response)
    }

    @Post('/register/customer')
    async registerCustmer(@Body() createUserDto: CreateUserDTO, @Res() response: Response): Promise<void> {
        return this.userService.registerStaff(createUserDto, response)
    }
}

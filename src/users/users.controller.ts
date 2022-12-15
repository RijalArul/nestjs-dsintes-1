import { Body, Controller, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { response, Response } from 'express';
import { CreateUserDTO, UpdateUserPasswordDTO, UpdateUserStatusDTO } from './dto/users.dto';
import { User } from './entity/users.entity';
import { UserResponse } from './response/users.response';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport'
import { Roles } from './decorator-guard/roles.decorator';
import { Role } from './entity/users-role.enum';
import { RolesGuard } from './decorator-guard/roles.guard';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { UserData } from './decorator-guard/get-auth.decorator';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) {

    }


    @Post('/register/staff')
    async registerStaff(@Body() createUserDto: CreateUserDTO, @Res() response: Response): Promise<void> {
        return this.userService.registerStaff(createUserDto, response)
    }

    @Post('/register/customer')
    async registerCustomer(@Body() createUserDto: CreateUserDTO, @Res() response: Response): Promise<void> {
        return this.userService.registerCustomer(createUserDto, response)
    }

    @Post('/login')
    async login(@Body() createUserDto: CreateUserDTO, @Res() response: Response): Promise<void> {
        return this.userService.login(createUserDto, response)
    }

    @Roles(Role.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getUsers(@Res() response: Response): Promise<void> {
        const users = await this.userService.getUsers()
        UserResponse(response, 200, "Success All Users", users)
    }

    @Roles(Role.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("/customer/:username")
    async updateStatus(@Param("username") username: string, @Body() updateUserStatus: UpdateUserStatusDTO, @Res() response: Response): Promise<void> {
        return await this.userService.updateStatus(updateUserStatus, username, response)
    }

    @UseGuards(JwtAuthGuard)
    @Put("/changePassword")
    async UpdatePassword(@UserData() user: User, @Body() updatePasswordDto: UpdateUserPasswordDTO, @Res() response: Response): Promise<void> {
        return await this.userService.updatePassword(updatePasswordDto, user, response)
    }


}

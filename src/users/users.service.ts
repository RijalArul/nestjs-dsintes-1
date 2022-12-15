import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/users.dto';
import { Role } from './entity/users-role.enum';
import { User } from './entity/users.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from "bcrypt"
import { Response } from 'express';
import { UserResponse } from './response/users.response';
import { BodyUserResp } from './web/users-body.response';
import { ErrorHandler } from 'src/exception/err-handler.excepton';
import { HashPassword } from 'src/helper/bcrypt.helper';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UsersRepository,
        // private readonly response: Response
    ) {
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.findAll()
    }

    async registerStaff(createUserDto: CreateUserDTO, response: Response): Promise<void> {
        try {
            const { password } = createUserDto
            createUserDto.password = await HashPassword(password)
            createUserDto.role = "staff"
            const newUser = await this.userRepository.create(createUserDto)
            UserResponse(response, 201, "Success Register", BodyUserResp(newUser))
        } catch (err) {
            const messageErrors = []
            messageErrors.push(`username ${createUserDto.username} already exist`)
            if (err.code === 11000) {
                ErrorHandler(400, messageErrors)
            } else {
                ErrorHandler(500, [])
            }
        }
    }

    async registerCustomer(createUserDto: CreateUserDTO, response: Response): Promise<void> {
        try {
            const { password } = createUserDto
            createUserDto.password = await HashPassword(password)
            createUserDto.role = "customer"
            const newUser = await this.userRepository.create(createUserDto)
            UserResponse(response, 201, "Success Register", BodyUserResp(newUser))
        } catch (err) {
            const messageErrors = []
            messageErrors.push(`username ${createUserDto.username} already exist`)
            if (err.code === 11000) {
                ErrorHandler(400, messageErrors)
            } else {
                ErrorHandler(500, [])
            }
        }
    }
}

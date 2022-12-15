import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO, UpdateUserPasswordDTO, UpdateUserStatusDTO } from './dto/users.dto';
import { Role } from './entity/users-role.enum';
import { User } from './entity/users.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from "bcrypt"
import { Response } from 'express';
import { UserResponse } from './response/users.response';
import { BodyLoginResp, BodyUserResp } from './web/users-body.response';
import { ErrorHandler } from 'src/users/exception/err-handler.excepton';
import { ComparePassword, HashPassword } from 'src/users/helper/bcrypt.helper';
import { JwtService } from '@nestjs/jwt';
import { UserStatus } from './entity/users-status..enum';
import { JwtPayload } from './jwt/jwt-payload';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UsersRepository,
        private readonly jwtService: JwtService
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

    async login(createUserDto: CreateUserDTO, response: Response): Promise<void> {
        try {
            const { username, password } = createUserDto
            const user = await this.userRepository.findUserByUsername(username)
            if (user) {
                if (user.status === UserStatus.ACCEPTED) {
                    const comparePass = await ComparePassword(password, user.password)
                    if (comparePass) {
                        const payload: JwtPayload = { id: user.id, username: user.username, role: user.role };
                        const genToken: string = this.jwtService.sign(payload)
                        UserResponse(response, 200, "Login Success", BodyLoginResp(genToken, user))

                    } else {
                        throw "Please remember your credentials"
                    }
                } else {
                    throw "Waiting Confirm"
                }
            } else {
                throw "Please remember your credentials"

            }
        } catch (err) {
            const messageErrors = []
            messageErrors.push(err)
            if (err === "Please remember your credentials" || "Waiting Confirm") {
                ErrorHandler(401, messageErrors)
            } else {
                ErrorHandler(500, [])
            }
        }
    }

    async updateStatus(updateStatusDto: UpdateUserStatusDTO, username: string, response: Response): Promise<void> {
        try {
            // console.log(username)
            const customer = await this.userRepository.findUserByUsername(username)

            if (customer) {
                const user = await this.userRepository.updateStatus(updateStatusDto, customer.username)

                UserResponse(response, 200, "Success Update", BodyUserResp(user))
            } else {
                throw `username not found`
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
    async updatePassword(updatePasswordDto: UpdateUserPasswordDTO, user: User, response: Response): Promise<void> {
        try {
            const customer = await this.userRepository.findUserByUsername(user.username)

            if (customer) {
                const { password } = updatePasswordDto
                updatePasswordDto.password = await HashPassword(password)
                const user = await this.userRepository.updatePassword(updatePasswordDto, customer.username)
                UserResponse(response, 200, "Success Update", BodyUserResp(user))
            } else {
                throw `username not found`
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

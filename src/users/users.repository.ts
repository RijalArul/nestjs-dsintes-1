import { Injectable } from '@nestjs/common';
import { Repository, getConnection } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm"
import { User } from './entity/users.entity';
import { CreateUserDTO, UpdateUserPasswordDTO, UpdateUserStatusDTO } from './dto/users.dto';
import { Role } from './entity/users-role.enum';
import { UserStatus } from './entity/users-status..enum';
import * as mongodb from "mongodb"

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly userModel: Repository<User>
    ) {
    }
    async create(createUserDto: CreateUserDTO): Promise<User> {
        const { username, password, role } = createUserDto
        const newUser = this.userModel.create({ username, password, role: role === "staff" ? Role.STAFF : Role.CUSTOMER, status: role === "staff" ? UserStatus.ACCEPTED : UserStatus.WAITING })
        await this.userModel.save(newUser)
        return newUser
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find()
    }

    async findUserByUsername(username: string): Promise<User> {
        return await this.userModel.findOne({
            where: {
                username: username
            }
        })
    }

    async updateStatus(userStatusDto: UpdateUserStatusDTO, username: string): Promise<User> {
        const user = await this.findUserByUsername(username)
        user.status = userStatusDto.status === "accepted" ? UserStatus.ACCEPTED : UserStatus.REJECTED
        await this.userModel.update({ username: username }, { status: user.status })
        return user
    }

    async updatePassword(updatePasswordDto: UpdateUserPasswordDTO, username: string): Promise<User> {
        const user = await this.findUserByUsername(username)
        user.password = updatePasswordDto.password
        await this.userModel.update({ username: username }, { password: user.password })
        return user
    }

}

import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm"
import { User } from './entity/users.entity';
import { CreateUserDTO } from './dto/users.dto';
import { Role } from './entity/users-role.enum';


@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly userModel: Repository<User>
    ) {
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find()
    }

    async create(createUserDto: CreateUserDTO): Promise<User> {
        const { username, password, role } = createUserDto
        const newUser = this.userModel.create({ username, password, role: role === "staff" ? Role.STAFF : Role.CUSTOMER })
        await this.userModel.save(newUser)
        return newUser
    }
}

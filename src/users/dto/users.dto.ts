import { IsString, IsNotEmpty, MinLength, MaxLength, IsEnum, IsOptional } from "class-validator"
import { Role } from "../entity/users-role.enum"
export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsString()
    @MinLength(6)
    @MaxLength(10)
    password: string

    @IsOptional()
    @IsEnum(Role, { each: true })
    role: string
}
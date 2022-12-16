import { IsString, IsNotEmpty, MinLength, MaxLength, IsEnum, IsOptional } from "class-validator"
import { WarrantyRequest, WarrantyStatus } from "../entity/warranties.enum"
export class CreateWarrantyDTO {
    @IsNotEmpty()
    @IsString()
    name: string
    @IsOptional()
    @IsEnum(WarrantyRequest, { each: true })
    request: string

    @IsOptional()
    @IsEnum(WarrantyStatus, { each: true })
    status: string
}

export class UpdateWarrantyDTO {
    @IsOptional()
    @IsEnum(WarrantyStatus, { each: true })
    status: string
}


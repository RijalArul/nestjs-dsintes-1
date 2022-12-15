import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { WarrantyStatus } from "../entity/warranty.enum"

export class CreateProductDTO {
    @IsNotEmpty()
    @IsString()
    name: string

    image_url: string
}
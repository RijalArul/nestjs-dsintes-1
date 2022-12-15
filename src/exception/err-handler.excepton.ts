import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { Response } from "express";

export function ErrorHandler(statusCode: number, msg: string[]) {
    switch (statusCode > 0) {
        case statusCode == 400:
            throw new BadRequestException(msg)

        default:
            throw new InternalServerErrorException();
    }
}
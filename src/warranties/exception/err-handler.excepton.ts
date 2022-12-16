import { BadRequestException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Response } from "express";

export function ErrorHandler(statusCode: number, msg: string[]) {
    switch (statusCode > 0) {
        case statusCode == 400:
            throw new BadRequestException(msg)
        case statusCode == 401:
            throw new UnauthorizedException(msg)
        case statusCode == 404:
            throw new NotFoundException(msg)
        default:
            throw new InternalServerErrorException();
    }
}
import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserData } from 'src/users/decorator-guard/get-auth.decorator';
import { Roles } from 'src/users/decorator-guard/roles.decorator';
import { RolesGuard } from 'src/users/decorator-guard/roles.guard';
import { Role } from 'src/users/entity/users-role.enum';
import { User } from 'src/users/entity/users.entity';
import { JwtAuthGuard } from 'src/users/jwt/jwt-auth.guard';
import { CreateProductDTO } from './dto/products.dto';
import { ProductsService } from './products.service';
// import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) { }
    @Roles(Role.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor(
        'image_url',
        {
            storage: diskStorage({
                destination: './files',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        }
    ))
    async create(@UploadedFile() file: Express.Multer.File, @Body() createProductDto: CreateProductDTO, @UserData() user: User, @Res() res: Response): Promise<void> {
        const SERVER_URL: string = "http://localhost:3000/products/image";
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        createProductDto.image_url = SERVER_URL + "/" + response.filename
        return await this.productsService.create(createProductDto, user, res)
    }

    @Get('image/:fileId')
    async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, { root: 'files' });
    }

    // @Get(":imgpath")
    // seeUploadFile(@Param("imgpath") Image)
}

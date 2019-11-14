import {
  Controller,
  Get,
  Post,
  Res,
  Param,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  diskStorage
} from 'multer';
import { extname } from  'path';

import { ProductsService } from '../products/products.service';

@Controller('images')
export class ImagesController
{
  constructor(
    private readonly productsService: ProductsService
  ) { }

  @Post('products/:productid')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './media/products',
      filename: function(req, file, cb) {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      },
    }),
    fileFilter: function(req, file, cb) {
      if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(null, false);
      }
      cb(null, true);
    },
  }))
  async uploadProductImage(
    @Param('productid') product_id,
    @UploadedFile() file
  ) {
    if(typeof file !== 'undefined')
    {
      var response = await this.productsService.updateOneById(product_id, {
        image_url: file.filename,
      });

      return {
        originalname: file.originalname,
        filename: file.filename,
      };
    }
    return {
      error: 'Only Image files are allowed',
    };
  }

  @Get('products/:imgpath')
  seeUploadedFile(
    @Param('imgpath') image, @Res() res
  ) {
    return res.sendFile(image, { root: './media/products'});
  }
}

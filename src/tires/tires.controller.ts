import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TireDto } from 'dto/tire.dto';
import { ITire } from 'models/tires.model';
import { diskStorage } from 'multer';
import path from 'path';
import { ParseObjectIdPipe } from 'pipe/objectIDPipe';
import { TiresService } from './tires.service';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { TTireADD } from 'interface/response.interface';
import * as fs from 'fs';

export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      console.log(req.user, 'asda');
      const user = JSON.parse(JSON.stringify(req.user));
      if (!fs.existsSync(`./uploads/${user.userID}`)) {
        fs.mkdirSync(`./uploads/${user.userID}`, {
          recursive: true,
        });
      }
      const filename: string =
        `${user.userID}` +
        '/' +
        path.parse(file.originalname).name.replace(/\s/g, '') +
        uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('')
export class TiresController {
  constructor(private readonly tiresService: TiresService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('tire-add')
  @UseInterceptors(FilesInterceptor('file', 10, storage))
  async addTire(
    @UploadedFiles() file,
    @Request() req,
    @Body() tire: TireDto,
  ): Promise<any> {
    // if (file) {
    //   const fileNameOnly = file.map((item) => {
    //     return item.filename;
    //   });
    //   const newTire: TireDto = JSON.parse(tire);
    //   newTire.photos = fileNameOnly;
    //   return await this.tiresService.addTire(req.user.userID, newTire);
    // } else {
    //   return { success: false, msg: 'Images is required' };
    // }
    return;
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('/:tireID')
  async getAllTire(
    @Param('tireID', ParseObjectIdPipe) tireID: string,
    @Req() req,
  ): Promise<ITire> {
    return await this.tiresService.getTire(req.user.userID, tireID);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async getTire(@Req() req): Promise<ITire[] | string> {
    return await this.tiresService.getTires(req.user.userID);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(FilesInterceptor('file', 10, storage))
  uploadFile(@UploadedFiles() file, @Request() req): any {
    // console.log(req.protocol + '://' + req.get('host') + '/uploads');
    // const serverURL = req.protocol + '://' + req.get('host') + '/uploads/';

    if (file) {
      const fileNameOnly = file.map((item) => {
        console.log(item);
        return item.filename;
      });
      return { success: true, fileList: fileNameOnly };
    }
    return { success: false, msg: 'Images is required' };
  }

  @Get('tires/popular')
  async getPopularTires(): Promise<any> {
    const tires = await this.tiresService.getPopulateTires();
    return { tires };
  }
}

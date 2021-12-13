import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TireDto } from 'dto/tire.dto';
import { ITire } from 'models/tires.model';
import { diskStorage } from 'multer';
import path from 'path';
import { ParseObjectIdPipe } from 'pipe/objectIDPipe';
import { TiresService } from './tires.service';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { TGetTire, TTireADD } from 'interface/response.interface';
import * as fs from 'fs';

export const storage = {
  storage: diskStorage({
    destination: './tmp',
    filename: (req, file, cb) => {
      console.log(req.user, 'asda');
      const user = JSON.parse(JSON.stringify(req.user));
      if (!fs.existsSync(`./tmp`)) {
        fs.mkdirSync(`./tmp`, {
          recursive: true,
        });
      }
      const filename: string =
        // `${user.userID}` +
        // '/' +
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('mytires')
export class TiresController {
  constructor(private readonly tiresService: TiresService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addTire(@Request() req, @Body() tire: TireDto): Promise<any> {
    // fs.rename(`./uploads/${req.user.userID}`, `./tmp/newName`, (err) => {
    //   if (!err) {
    //     console.log(err);
    //     return 'false';
    //   } else {
    //     return 'true';
    //   }
    // });
    // fs.cp(`/uploads/${req.user.userID}`, `/${req.user.userID}`, (err) => {
    //   if (!err) {
    //     console.log(err);
    //     return 'ERROR IN SERVER';
    //   } else {
    //     return 'SUCCESS';
    //   }
    // });
    // if (file) {
    //   const fileNameOnly = file.map((item) => {
    //     return item.filename;
    //   });
    //   const newTire: TireDto = JSON.parse(tire);
    //   newTire.photos = fileNameOnly;
    return await this.tiresService.addTire(req.user.userID, tire);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('/:tireID')
  async getAllTire(
    @Param('tireID', ParseObjectIdPipe) tireID: string,
    @Req() req,
  ): Promise<TGetTire> {
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
    if (file) {
      const fileNameOnly = file.map((item) => {
        const lngth = item.filename.split('/').length;
        return item.filename.split('/')[lngth - 1];
      });
      return { success: true, fileList: fileNameOnly };
    }
    return { success: false, msg: 'Images is required' };
  }

  @Get('tires/popular')
  @ApiQuery({
    name: 'tireType',
    required: false,
  })
  @ApiQuery({
    name: 'tireSize',
    required: false,
  })
  @ApiQuery({
    name: 'tireWidth',
    required: false,
  })
  @ApiQuery({
    name: 'wheelDiameter',
    required: false,
  })
  async getPopularTires(@Query() query): Promise<any> {
    for (const key of Object.keys(query)) {
      if (query[key] === '') {
        delete query[key];
      }
    }
    console.log(query);
    const tires = await this.tiresService.getPopulateTires(query);
    return { tires };
  }
}

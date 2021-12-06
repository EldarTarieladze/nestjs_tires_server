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
import fs from 'fs';

export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
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
    const fileNameOnly = file.map((item) => {
      return item.filename;
    });
    console.log(tire, 'test');
    // const newTire: TireDto = JSON.parse(tire);
    // newTire.photos = fileNameOnly;
    return;
    // return await this.tiresService.addTire(req.user.userID, newTire);
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
  @Post('upload')
  @UseInterceptors(FilesInterceptor('file', 10, storage))
  uploadFile(@UploadedFiles() file, @Request() req): Observable<any> {
    const user = req.user;
    console.log(JSON.parse(req.body.lastname).name);
    console.log(file);

    return file;
  }

  @Get('tires/popular')
  async getPopularTires(): Promise<any> {
    const tires = await this.tiresService.getPopulateTires();
    return { tires };
  }
}

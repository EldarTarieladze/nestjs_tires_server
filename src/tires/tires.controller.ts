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

export const storage = {
  storage: diskStorage({
    destination: './src/uploads',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('my-tires')
export class TiresController {
  constructor(private readonly tiresService: TiresService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addTire(@Req() req, @Body() tire: TireDto): Promise<string> {
    return await this.tiresService.addTire(req.user.userID, tire);
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
}

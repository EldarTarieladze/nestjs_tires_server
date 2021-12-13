import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TireDto } from 'dto/tire.dto';
import { ITire } from 'models/tires.model';
import { IUser } from 'models/user.model';
import { Model } from 'mongoose';
import * as fs from 'fs';
import { Key } from 'readline';

@Injectable()
export class TiresService {
  constructor(
    @InjectModel('tires')
    private readonly tireModel: Model<ITire>,
    @InjectModel('users')
    private readonly userModel: Model<IUser>,
  ) {}

  async addTire(userID: string, tire: TireDto) {
    const newTT = { ...tire, userID: userID };
    console.log(newTT);
    try {
      const newTire = await this.tireModel.create({ ...tire, userID: userID });
      const addTireToUser = await this.userModel.findByIdAndUpdate(userID, {
        $push: {
          myTires: newTire._id,
        },
      });

      if (!addTireToUser)
        throw new NotFoundException({
          description: 'authorization failed',
        });
      newTire.photos.map((element) => {
        if (!fs.existsSync(`./uploads/${newTire._id}`)) {
          fs.mkdirSync(`./uploads/${newTire._id}`, {
            recursive: true,
          });
        }
        fs.renameSync(
          `./tmp/${element}`,
          `./uploads/${newTire._id}/${element}`,
        );
      });
      console.log(newTire);
      return {
        success: true,
        msg: 'Tire add successfully!',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({ description: error });
    }
  }
  async getTire(userID: string, tireID: string) {
    try {
      const tire = await this.tireModel.findOne({
        userID: userID,
        _id: tireID,
      });
      if (!tire) {
        throw new NotFoundException({ description: 'Not Found' });
      }
      return {
        success: true,
        tire,
      };
    } catch (error) {
      console.log(error, 'asdas');
      throw new InternalServerErrorException();
    }
  }
  async getTires(userID: string) {
    try {
      const userTires = await this.tireModel.find({ userID: userID });

      if (!userTires) return 'Tires not found';

      return userTires;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getPopulateTires(queryParam: any) {
    try {
      const tires = await this.tireModel.find(queryParam);
      return tires;
    } catch (error) {
      console.log(error);
    }
  }
}

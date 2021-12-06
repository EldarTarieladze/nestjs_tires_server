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

@Injectable()
export class TiresService {
  constructor(
    @InjectModel('tires')
    private readonly tireModel: Model<ITire>,
    @InjectModel('users')
    private readonly userModel: Model<IUser>,
  ) {}

  async addTire(userID: string, tire: TireDto) {
    try {
      const newTire = await this.tireModel.create(tire);
      const addTireToUser = await this.userModel.findByIdAndUpdate(userID, {
        $push: {
          myTires: newTire._id,
        },
      });

      if (!addTireToUser)
        throw new NotFoundException({
          description: 'authorization failed',
        });
      await newTire.save();
      return 'Tire add successfully!';
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
  async getTire(userID: string, tireID: string) {
    try {
      const tire = await this.tireModel.findOne({
        userID: userID,
        _id: tireID,
      });
      if (!tire) throw new NotFoundException();
      return tire;
    } catch (error) {
      console.log(error);
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
}

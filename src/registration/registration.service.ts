import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegDto } from 'dto/registration.dto';
import { Model } from 'mongoose';
import { IUser } from './../models/user.model';

@Injectable()
export class RegistrationService {
  constructor(@InjectModel('users') private readonly userModel: Model<IUser>) {}

  async registartionUser(user: RegDto) {
    try {
      console.log(user);
      const newUser = new this.userModel(user);
      await newUser.save();
      return { message: 'User successfully add' };
    } catch (err) {
      console.log(err);
      console.log(err._message);
      return { message: 'server Error' };
    }
  }
}

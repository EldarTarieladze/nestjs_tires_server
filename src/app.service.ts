import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('users')
    private readonly userModel: Model<IUser>,
  ) {}
  getHello(): string {
    return 'Healthy Check!';
  }
  async generateNewToken(tokenPayload: any) {
    try {
      const user = await this.userModel.findById(tokenPayload.userID);

      if (!user) throw new NotFoundException({ message: 'User not found' });

      const newAccessToken = this.jwtService.sign({
        userID: tokenPayload.userID,
        email: tokenPayload.email,
      });
      return {
        success: true,
        access_token: newAccessToken,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}

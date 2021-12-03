import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from 'dto/auth.dto';
import { IUser } from 'models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('users') private readonly userModel: Model<IUser>,
  ) {}

  async signinLocal(dto: AuthDto) {
    try {
      console.log(dto);
      const user = await this.userModel.findOne({ email: dto.email });
      console.log(user);
      if (!user) throw new UnauthorizedException('Credentials incorrect');
      if (user.password !== dto.password)
        throw new UnauthorizedException('Credentials incorrect');

      return this.signUser(user._id, user.email);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  signUser(userID: string, email: string) {
    return {
      success: true,
      access_token: this.jwtService.sign({
        userID,
        email,
      }),
    };
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EducationDto } from 'dto/education.dto';
import { IUserEducation } from 'models/education.model';
import { IUser } from 'models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel('educations')
    private readonly educationModel: Model<IUserEducation>,
    @InjectModel('users')
    private readonly userModel: Model<IUser>,
  ) {}

  async findEducations(userID: string) {
    this.userModel
      .findById(userID)
      .populate('education')
      .exec((err, doc) => {
        console.log(doc);
      });
    const userEducations = await this.userModel
      .findById(userID)
      .populate('education');

    console.log(userEducations);
    if (!userEducations) throw new UnauthorizedException();
    return userEducations;
  }

  async getEducationInfo(educationID: string) {
    try {
      const education = await this.educationModel
        .findById(educationID)
        .select('-_id -__v');

      if (!education)
        throw new NotFoundException({
          description: 'education not found',
        });
      return education;
    } catch (err) {
      console.log(err.reason);
      throw new InternalServerErrorException({
        description: 'Server Error please try again',
      });
    }
  }

  async addEducationInfo(userID: string, education: EducationDto) {
    try {
      const newEducation = new this.educationModel(education);
      console.log(newEducation, 'newEducation');
      const addEduciatonToUser = await this.userModel.findByIdAndUpdate(
        userID,
        {
          $push: {
            education: newEducation._id,
          },
        },
      );
      if (!addEduciatonToUser)
        throw new NotFoundException({
          description: "education didn't updated",
        });
      await newEducation.save();
      return 'education add successfully';
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  async updateEducationInfo(
    educationID: string,
    updatedEducation: EducationDto,
  ) {
    const education = await this.educationModel.findByIdAndUpdate(
      educationID,
      updatedEducation,
      {
        new: true,
      },
    );
    if (!education) throw new BadRequestException();
    return education;
  }

  async deleteEducationInfo(educationID: string) {
    try {
      const deleteEducation = await this.educationModel.findByIdAndDelete(
        educationID,
      );
      if (!deleteEducation) return 'this education not found';
      return 'education delete successfully';
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }
}

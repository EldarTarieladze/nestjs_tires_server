import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { educationSchema } from 'models/education.model';
import { userSchema } from 'models/user.model';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'educations', schema: educationSchema },
      { name: 'users', schema: userSchema },
    ]),
  ],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}

import { RegistrationService } from './registration.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'models/user.model';
import { RegistrationController } from './registration.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: userSchema }])],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}

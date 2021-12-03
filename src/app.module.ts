import { RegistrationModule } from './registration/registration.module';
import { ProtectedModule } from './protected/protected.module';
import { AuthModule } from 'auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationModule } from './education/education.module';

@Module({
  imports: [
    RegistrationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_STRING),
    ProtectedModule,
    AuthModule,
    EducationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

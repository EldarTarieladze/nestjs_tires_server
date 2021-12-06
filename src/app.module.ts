import { RegistrationModule } from './registration/registration.module';
import { AuthModule } from 'auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationModule } from './education/education.module';
import { TiresModule } from './tires/tires.module';
import { userSchema } from 'models/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '10000s' },
      }),
    }),
    RegistrationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_STRING),
    MongooseModule.forFeature([{ name: 'users', schema: userSchema }]),
    AuthModule,
    EducationModule,
    TiresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

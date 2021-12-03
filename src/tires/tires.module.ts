import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { tiresSchema } from 'models/tires.model';
import { userSchema } from 'models/user.model';
import { TiresController } from './tires.controller';
import { TiresService } from './tires.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'tires', schema: tiresSchema },
      { name: 'users', schema: userSchema },
    ]),
  ],
  controllers: [TiresController],
  providers: [TiresService],
})
export class TiresModule {}

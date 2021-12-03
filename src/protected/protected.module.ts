import { ProtectedService } from './protected.service';
import { Module } from '@nestjs/common';
import { ProtectedController } from 'protected/protected.controller';
@Module({
  imports: [],
  controllers: [ProtectedController],
  providers: [ProtectedService],
})
export class ProtectedModule {}

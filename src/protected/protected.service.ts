import { Injectable } from '@nestjs/common';

@Injectable()
export class ProtectedService {
  getStudentInfo = () => {
    return 'student info';
  };
}

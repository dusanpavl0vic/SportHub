import { ClassSerializerInterceptor, Controller, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

}

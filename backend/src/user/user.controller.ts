import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import IErrorReturn from 'src/interfaces/IErrorReturn';
import { ILogin } from 'src/interfaces/ILogin';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async createUser(
    @Body() data: CreateUserDto
  ): Promise<CreateUserDto | IErrorReturn> {
    return await this.userService.createUser(data);
  }

  @Post('login')
  async login(@Body() data: CreateUserDto): Promise<ILogin | IErrorReturn> {
    return await this.userService.login(data);
  }
}

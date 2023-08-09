import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDTO } from "./dtos/register-user.dto";
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Post('register')
    async postRegisterUser(@Body() data: UserRegisterDTO): Promise<UserRegisterDTO | void>{
        const user = await this.userService.registerUser(data);
        return user;
    }
}

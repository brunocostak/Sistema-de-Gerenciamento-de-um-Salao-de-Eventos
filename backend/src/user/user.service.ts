import { Injectable } from '@nestjs/common';
import { UserRegisterDTO } from "./dtos/register-user.dto";
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async registerUser(data: UserRegisterDTO): Promise<UserRegisterDTO | void> {
        return await this.prisma.user.create({ data })
    }
}

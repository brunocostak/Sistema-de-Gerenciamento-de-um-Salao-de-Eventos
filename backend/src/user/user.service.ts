import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import IErrorReturn from 'src/interfaces/IErrorReturn';
import { hashPassword, comparePassword } from 'src/utils/helperCrypt';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { ILogin } from 'src/interfaces/ILogin';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async createUser(data: CreateUserDto): Promise<CreateUserDto | IErrorReturn> {
    const cryptPassword = await hashPassword(data.password);
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role ? data.role : 'USER',
        password: cryptPassword,
      },
    });
    if (!user) {
      return {
        error: 'Error creating user',
        statusCode: 404,
        message: 'Error creating user',
      };
    }

    return user;
  }

  async login(data: LoginUserDto): Promise<ILogin | IErrorReturn> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return {
        error: 'Invalid password or Email',
        statusCode: 404,
        message: 'Invalid password or Email',
      };
    }

    const compare = await comparePassword(data.password, user.password);

    if (!compare) {
      return {
        error: 'Invalid password or Email',
        statusCode: 401,
        message: 'Invalid password or Email',
      };
    }

    const token = this.jwtService.sign({ id: user.id, name: user.name });

    return {
      email: user.email,
      name: user.name,
      token,
    };
  }

  async findUserById(id: number): Promise<User | IErrorReturn> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return {
        error: 'User not found',
        statusCode: 404,
        message: 'User not found',
      };
    }

    return user;
  }
}

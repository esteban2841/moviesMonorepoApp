import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../services/users';
import { response } from 'express';
import { User, UserSchema } from '../schemas/users';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Req } from '@nestjs/common';
import { Request } from '@nestjs/common';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async generateHashedPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
  }

  @Get()
  async findAll(): Promise<object> {
    return await this.usersService.findAll();
  }

  @Post()
  async addNewUser(
    @Res({ passthrough: true }) response,
    @Body() userData: any,
  ): Promise<any> {
    try {
      const userHashed = await this.generateHashedPassword(userData.password);

      const newUser = this.usersService.addNewUser({
        ...userData,
        password: userHashed,
      });
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfuly',
        user: newUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User cannot be created!',
        error: 'Bad Request',
      });
    }
  }

  @Post('/login')
  async login(
    @Res() response,
    @Body('password') password: string,
    @Body('email') email: string,
  ) {
    try {
      const user = await this.usersService.findOne({ password, email });
      if (!(await bcrypt.compare(password, user.password))) {
        throw new BadRequestException('invalid credentials');
      }
      const jwt = await this.jwtService.signAsync({ id: user._id });

      response.cookie('jwt', jwt, { httpOnly: true });

      return response.json({
        message: 'User has logged in successfully',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: ' + error,
        error: 'Bad Request',
      });
    }
  }

  @Get('/user')
  async user(
    @Res({ passthrough: true }) response,
    @Req() request,
  ): Promise<string> {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const user = await this.userModel.findById(data.id);

      return response.json({
        message: 'User has logged in successfully',
        user,
      });
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}

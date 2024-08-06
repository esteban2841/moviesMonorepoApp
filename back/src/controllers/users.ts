import { Body, Controller, Get, Post, Res, HttpStatus, BadRequestException } from '@nestjs/common';
import { UsersService } from '../services/users';
import { response } from 'express';
import { User, UserSchema } from '../schemas/users';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async generateHashedPassword(password: string):Promise<string>{
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword
  }

  @Get()
  async findAll(): Promise<object> {
    return await this.usersService.findAll();
  }
  @Post()
  async addNewUser( @Res() response, @Body() userData: any ): Promise<any> {
    try{
      const userHashed = await this.generateHashedPassword(userData.password) 
    
      const newUser = this.usersService.addNewUser({
        ...userData,
        password: userHashed
      });
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfuly',
        user: newUser
      })

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User cannot be created!',
        error: 'Bad Request'
      });
    }
  }
  @Post('/login')
  async login( @Res() response, @Body('password') password: string, @Body('email') email: string ) {
    try{
      const user = await this.usersService.findOne({password, email})
      if (!await bcrypt.compare(password, user.password)){
        throw new BadRequestException('invalid credentials')
      }
      return response.status(HttpStatus.CREATED).json({
        message: 'User has logged in successfully',
        user: user
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: ' + error,
        error: 'Bad Request'
      });
    }
  }

}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/users';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.usersModel.find().exec();
  }
  async addNewUser( userData: User ): Promise<User> {
    const userExists = await this.usersModel.findOne({email: userData.email}).exec()
    if( userExists ){
        throw new Error('email is used and already exists')
    }
    const newUser = new this.usersModel(userData);
    return newUser.save();
  }
  async findOne( userData: any ): Promise<any> {
    const userExists = await this.usersModel.findOne({email: userData.email}).exec()
	console.log("TCL: UsersService -> constructor -> userExists", userExists)
    if( !userExists ){
        throw new Error('user is not registered')
    }
    if( userExists ){
        return userExists
    }
  }
}

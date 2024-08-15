import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/users';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.usersModel.find().exec();
  }
  async addNewUser(userData: User): Promise<User> {
    const userExists = await this.usersModel
      .findOne({ email: userData.email })
      .exec();
    if (userExists) {
      throw new Error('email is used and already exists');
    }
    userData.id = uuidv4();
    const newUser = await this.usersModel.create(userData);
    return newUser;
  }
  async updateUser(userData: User): Promise<User> {
    const userExists = await this.usersModel
      .findOne({ email: userData.email })
      .exec();
    if (userExists) {
      throw new Error('user does not exists');
    }
    const newUser = await this.usersModel.updateOne({ email: userData.email });
    return newUser;
  }
  async findOne(userData: any): Promise<any> {
    const userExists = await this.usersModel
      .findOne({ email: userData.email })
      .exec();
    if (!userExists) {
      throw new Error('user is not registered');
    }
    if (userExists) {
      return userExists;
    }
  }
}

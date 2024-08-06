import { Global, Module } from '@nestjs/common';
import { UsersService } from '../services/users';
import { UsersController } from '../controllers/users';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/users';
import { JwtModule } from '@nestjs/jwt';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot(process.env.MONGO_URI),
    JwtModule.register({
      secret: 'hard!to-guess_secret',
      signOptions: {expiresIn: 60 * 24}
    })
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

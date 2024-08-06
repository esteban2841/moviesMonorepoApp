import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document  {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true})
  email: string

  @Prop({ required: true, type: String})
  password: string
  
  // Add other fields as needed
}

export const UserSchema = SchemaFactory.createForClass(User);

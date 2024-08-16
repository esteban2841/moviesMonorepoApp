import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: false, type: Array<number> })
  favorites: Array<number>;
  @Prop({ required: false, type: Array<number> })
  saved: Array<number>;

  // Add other fields as needed
}

export const UserSchema = SchemaFactory.createForClass(User);

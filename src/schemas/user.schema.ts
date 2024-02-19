import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';

import { IUser } from 'src/interfaces';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Users implements IUser {
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ required: true })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/schemas';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { passwordEnCryption } from 'src/common';
import { Errors } from 'src/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name)
    private usersModel: Model<UsersDocument>
  ) { }

  async create(body: CreateUserDto) {
    const emailExist = await this.usersModel.findOne({ email: body.email });
    if (emailExist) throw new BadRequestException(Errors.USERS.EMAIL_EXIST)

    body.password = passwordEnCryption(body.password);
    const users = new this.usersModel(body);
    return await users.save()
  }

  async findAll(): Promise<Users[]> {
    const users = await this.usersModel.find();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    const user = await this.usersModel.findOne({ email: email });
    return user
  }

}

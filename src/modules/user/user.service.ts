import { BadRequestException, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { Users, UsersDocument } from 'src/schemas';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';

import { passwordEnCryption } from 'src/common';
import { Errors } from 'src/constants';
import { CreateUserDto, QueryUserDto } from './dto/user.dto';

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

  async findAll(query: QueryUserDto): Promise<Users[]> {
    console.log(query)
    const users = await this.usersModel.find();
    return users
  }

  async findOne(id: string) {
    const user = await this.usersModel.findById(id);
    if (!user) throw new BadRequestException('Không tồn tại user!');
    return user
  }

  update(id: ObjectId | string, updateUserDto: any) {
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

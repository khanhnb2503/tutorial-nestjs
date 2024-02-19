import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('USER')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await this.userService.create(createUserDto);
    return response
  }

  @Get('list')
  async findAll() {
    const response = await this.userService.findAll();
    return response
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

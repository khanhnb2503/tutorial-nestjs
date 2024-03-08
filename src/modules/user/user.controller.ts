import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { AccessTokenGuard } from 'src/guards/access-token.guard';
import { RequestUser, User } from 'src/decorators';
import { CreateUserDto, QueryUserDto } from './dto/user.dto';
import { AnyExpression } from 'mongoose';

@ApiTags('USER')
@Controller('api/user')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await this.userService.create(createUserDto);
    return response
  }

  @Get('list')
  async findAll(@Query() query: QueryUserDto, @User() user: RequestUser) {
    const response = await this.userService.findAll(query);
    return response
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: AnyExpression) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

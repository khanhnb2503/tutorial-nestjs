import { BadRequestException, Injectable } from '@nestjs/common';

import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Errors } from 'src/constants';
import { comparePassword } from 'src/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }
  async login(body: LoginAuthDto) {
    const users = await this.userService.findUserByEmail(body.email);
    if (!users) throw new BadRequestException(Errors.USERS.EMAIL_NOT_EXIST)
    if (!comparePassword(body.password, users.password)) {
      throw new BadRequestException(Errors.USERS.PASSWORD_NOT_EXIST)
    }
    return {
      access_token: await this.jwtService.signAsync({ sub: users.username })
    }
  }
}

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

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByUser(username, pass)
    if (user && comparePassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(body: LoginAuthDto) {
    // Xác minh email
    const users = await this.userService.findUserByEmail(body.email);
    if (!users) throw new BadRequestException(Errors.USERS.EMAIL_NOT_EXIST)

    // Xác minh mật khẩu
    if (!comparePassword(body.password, users.password)) {
      throw new BadRequestException(Errors.USERS.PASSWORD_NOT_EXIST)
    }
    return this.generateTokens(users)
  }

  private async generateTokens(user: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { username: user.username, sub: user._id.toString() },
        {
          secret: 'N3AHHzKhlYv1wbJRklbcMYpAMMK05CNz3MwKuao67VdYAQn2Oht14WPnvR9DwGKu',
          expiresIn: '60s'
        }),
      this.jwtService.signAsync(
        { username: user.username, sub: user._id.toString() },
        {
          secret: 'tbipCxhVlqJZX4qpVjNqzn4cuXbjPg1cClHSwF13LdQDFGxo6jnTYclKXTrZd1Ca',
          expiresIn: '10d'
        }),
    ]);

    return { accessToken, refreshToken }
  }
}

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'N3AHHzKhlYv1wbJRklbcMYpAMMK05CNz3MwKuao67VdYAQn2Oht14WPnvR9DwGKu',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
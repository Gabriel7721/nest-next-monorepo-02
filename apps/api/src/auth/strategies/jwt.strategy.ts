import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUser } from '@musical/shared-types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'myjwt') {
  constructor() {
    const jwtSecret = process.env.JWT_SECRET as string;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtUser) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      subscriptionPlan: payload.subscriptionPlan,
    };
  }
}

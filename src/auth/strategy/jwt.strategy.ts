import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET@123', // move to .env in production
    });
  }

  async validate(payload: any) {
    // payload contains whatever was added in signAsync()
    return {
      id: payload.sub,
      phoneNumber: payload.phone,
      role: payload.role,
    };
  }
}

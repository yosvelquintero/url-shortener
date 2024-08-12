import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AUTH, ENV } from '@app/config';
import { IAuthJWTPayload, TAuthUserPartial } from '@app/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AUTH.guards.jwt) {
  public constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(ENV.auth.jwt.secret),
    });
  }

  public async validate(payload: IAuthJWTPayload): Promise<TAuthUserPartial> {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}

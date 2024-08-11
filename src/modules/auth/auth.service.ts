import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
  IAuthJWTPayload,
  IAuthToken,
  TAuthUserCredentials,
  TAuthUserPartial,
} from '@app/types';

import { UserDocument } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async login({
    email,
    password,
  }: TAuthUserCredentials): Promise<IAuthToken> {
    const user: TAuthUserPartial = await this.validateUser(email, password);
    const payload: IAuthJWTPayload = {
      sub: user.id,
      email,
      role: user.role,
    };

    return {
      id: user.id,
      token: await this.jwtService.signAsync(payload),
      role: user.role,
    };
  }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<TAuthUserPartial> {
    const user: UserDocument = await this.usersRepository.authenticateByEmail({
      email,
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('User email and/or password incorrect!');
    }
    return this.sanitized(user);
  }

  private sanitized({ _id, email, role }: UserDocument): TAuthUserPartial {
    return { id: _id, email, role };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ENTITY } from '@app/config/index';
import { UserDocument } from '@app/modules/users/entities/user.entity';
import {
  IAuthJWTPayload,
  IAuthToken,
  IAuthUserCredentials,
  IAuthUserPartial,
} from '@app/types/index';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(ENTITY.names.userEntity)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async login({
    email,
    password,
  }: IAuthUserCredentials): Promise<IAuthToken> {
    const user: IAuthUserPartial = await this.validateUser(email, password);
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
  ): Promise<IAuthUserPartial> {
    const user: UserDocument = await this.userModel.findOne({ email });
    if (!user || user.password !== password) {
      throw new UnauthorizedException('user email and/or password incorrect!');
    }
    return this.sanitized(user);
  }

  private sanitized({ _id, email, role }: UserDocument): IAuthUserPartial {
    return { id: _id, email, role };
  }
}

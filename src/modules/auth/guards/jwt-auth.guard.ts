import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AUTH } from '@app/config/index';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AUTH.guards.jwt) {}

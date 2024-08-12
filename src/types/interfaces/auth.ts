import { EUserRole } from '../enums/user-role';

export interface IAuthGuards {
  guards: {
    local: string;
    jwt: string;
  };
  saltRounds: number;
}

export interface IAuthUser {
  id: string;
  email: string;
  password: string;
  role: EUserRole;
}

export interface IAuthJWTPayload {
  sub: string;
  email: string;
  role: EUserRole;
}

export interface IAuthToken {
  id: string;
  token: string;
  role: EUserRole;
}

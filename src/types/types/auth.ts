import { IAuthUser } from '../interfaces/auth';

export type IAuthUserPartial = Pick<IAuthUser, 'id' | 'email' | 'role'>;
export type IAuthUserCredentials = Pick<IAuthUser, 'email' | 'password'>;

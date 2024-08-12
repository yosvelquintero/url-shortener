import { IAuthUser } from '../interfaces/auth';

export type TAuthUserPartial = Pick<IAuthUser, 'id' | 'email' | 'role'>;
export type TAuthUserCredentials = Pick<IAuthUser, 'email' | 'password'>;

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created: Date;
  updated: Date;
  deleted: Date | null;
}

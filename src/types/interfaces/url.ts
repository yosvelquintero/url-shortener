export interface IUrl {
  id?: string;
  url: string;
  code?: string;
  created: Date;
  expires: Date | null;
  deleted: Date | null;
}

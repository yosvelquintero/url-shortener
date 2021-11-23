export interface IUrl {
  id: string;
  userId: string;
  url: string;
  code: string;
  hits: number;
  created: Date;
  updated: Date;
  expires: Date | null;
  deleted: Date | null;
}

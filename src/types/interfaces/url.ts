export interface IUrl {
  id: string;
  userId: string;
  urlHitId: string;
  url: string;
  code: string;
  hits?: IUrlHit;
  created: Date;
  updated: Date;
  expires: Date | null;
  deleted: Date | null;
}

export interface IUrlHit {
  id: string;
  total: number;
}

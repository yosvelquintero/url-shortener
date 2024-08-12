export interface IDatabase {
  mongodb: {
    collections: {
      urls: string;
      urlHits: string;
      users: string;
    };
  };
}

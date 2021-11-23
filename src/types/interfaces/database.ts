export interface IDatabase {
  mongodb: {
    collections: {
      urls: string;
      users: string;
    };
  };
}

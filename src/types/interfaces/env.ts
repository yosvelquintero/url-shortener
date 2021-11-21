export interface IEnv {
  database: {
    app: {
      api: {
        host: string;
        port: string;
        prefix: string;
      };
    };
    mongodb: {
      mongodbHost: string;
      mongodbDb: string;
      mongodbUser: string;
      mongodbPort: string;
      mongodbPassword: string;
      mongodbUri: string;
    };
  };
}

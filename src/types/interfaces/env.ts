export interface IEnv {
  app: {
    api: {
      host: string;
      port: string;
      prefix: string;
      isProduction: string;
    };
  };
  database: {
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

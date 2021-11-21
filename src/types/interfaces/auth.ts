export interface IAuth {
  guards: {
    anonymous: string;
    local: string;
    jwt: string;
  };
}

/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface IConnection {
  name: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

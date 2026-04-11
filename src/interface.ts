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

export interface IPagination {
  total?: number;
  current: number;
  pageSize: number;
}

export interface INPost {
  title: string;
  description: string;
  contact_name: string;
  contact_phone: string;
  event_time: string;
  location_id: number;
}

export interface INLocal {
  address: string;
  latitude: number;
  longitude: number;
}

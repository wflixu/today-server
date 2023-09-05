import { App, Inject, Provide, Scope, ScopeEnum, Config } from '@midwayjs/core';
import { Client } from 'pg';
import { IConnection } from '../interface';
import { Application, Context } from '@midwayjs/koa';

@Provide()
export class PgmateService {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  getCachedClient(key: string): Client | undefined {
    const conns = (this.app.getAttr('conns') ?? {}) as {
      [key: string]: Client;
    };
    return conns[key];
  }
  cacheClient(key: string, client: Client) {
    const conns = (this.app.getAttr('conns') ?? {}) as {
      [key: string]: Client;
    };
    this.app.setAttr('conns', { ...conns, [key]: client });
  }
  getCachedConfig(key: string): IConnection | undefined {
    const configs = (this.app.getAttr('conns-config') ?? {}) as {
      [key: string]: IConnection;
    };
    return configs[key];
  }
  cacheConfig(key: string, config: IConnection) {
    const configs = (this.app.getAttr('conns-config') ?? {}) as {
      [key: string]: IConnection;
    };
    this.app.setAttr('conns-config', { ...configs, [key]: config });
  }

  buildClientKey(...args: string[]): string {
    const user = this.ctx.state?.user ?? {};
    return [user.name, ...args].join('-');
  }

  async createDb(conn: string, datbase: string) {
    const key = this.buildClientKey(conn);
    const client = this.getCachedClient(key);

    if (!client) {
      return null;
    } else {
      const res = await client.query({
        text: `CREATE DATABASE ${datbase};`,
      });
      console.warn('res:', res);
      return datbase;
    }
  }
  async delDb(conn: string, datname: string) {
    const key = this.buildClientKey(conn);
    const client = this.getCachedClient(key);
    if (!client) {
      return null;
    } else {
      const res = await client.query({
        text: `DROP DATABASE  ${datname};`,
      });
      console.warn('del database succes, the res:', res);
      return datname;
    }
  }
  async getDbInfo(conn: string, datname: string) {
    const key = this.buildClientKey(conn, datname);
    let client = this.getCachedClient(key);
    if (!client) {
      const parentKey = this.buildClientKey(conn);
      const { host, port, username, password } =
        this.getCachedConfig(parentKey)!;

      client = new Client({
        host,
        port,
        database: datname,
        user: username,
        password,
        application_name: 'pgmate',
      });
      this.cacheClient(key, client);
      client.connect();
    }
    const { fields, rows } = await client.query({
      text: "SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ('information_schema', 'pg_catalog','pg_toast') ;",
    });
    return rows;
  }

  async connect(connection: IConnection) {
    const { name, host, port, username, database, password } = connection;
    const user = this.ctx.state?.user ?? {};
    const key = [user.name, name].join('-');
    let client = this.getCachedClient(key);
    if (!client) {
      client = new Client({
        host,
        port,
        database,
        user: username,
        password,
        application_name: 'pgmate',
      });
      this.cacheClient(key, client);
      this.cacheConfig(key, connection);
      await client.connect();
    }
    const { rows, fields } = await client.query({
      text: 'SELECT oid,datname FROM pg_database  WHERE  NOT datistemplate;',
      rowMode: 'array',
    });
    return rows.map(row => {
      return row.reduce((pre, cur, idx) => {
        const fieldName = fields[idx]['name'];
        return {
          ...pre,
          [fieldName]: cur,
        };
      }, {});
    });
  }
}

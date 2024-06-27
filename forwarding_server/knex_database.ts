/**
 * @file  in_memory_database.ts
 */
import { IAccountDatabase } from "./idatabase"
import { AccountInfo } from "./types"

import Knex from 'knex';
import knexDevelopmentConfig from './knexfile';

const config = knexDevelopmentConfig;

// pass through
export class KnexDatabase implements IAccountDatabase
{
  constructor()
  {

    this.knex = Knex(config);
    async function query(knex : any, tableName : string)
    {
      const exists = await knex.schema.hasTable(tableName);
      if(exists)
      {
        await knex.schema.createTable(tableName, (table : any) =>
        {
          table.increments('id').primary();
          table.string('account_name'); // key
          table.string('owner');
          table.string('repo');
          table.string('token');
        });
      }
    }
    query(this.knex, this.tableName);
  }

  create(key: string, value: AccountInfo): void
  {
    async function query(knex : any, tableName : string)
    {
      await knex(tableName).insert(value);
    }
    query(this.knex, this.tableName);
  }

  read(key: string): AccountInfo | undefined
  {
    async function query(knex : any, tableName : string)
    {
      const account = await knex(tableName).where({ account_name: key});
      var accountInfo = {} as AccountInfo;

      accountInfo.owner = account.owner;
      accountInfo.repo = account.repo;
      accountInfo.token = account.token;

      return accountInfo;
    }

    var accountInfo = {} as AccountInfo;
    return accountInfo;
  }

  update(key: string, value: AccountInfo): void
  {
      var owner = value.owner;
      var repo = value.repo;
      var token = value.token;
      async function query(knex : any, tableName : string)
      {
        let partialQuery = knex(tableName).where({ account_name: key });
        await partialQuery.update({key, owner, repo, token});
      }
      query(this.knex, this.tableName);
  }

  delete(key: string): void
  {
      async function query(knex : any) 
      {
        let partialQuery = knex('accounts').where({ account_name: key });
        await partialQuery.del();
      }
      query(this.knex);
  }

  private knex: Knex.Knex;
  private tableName: string = 'accounts';
}

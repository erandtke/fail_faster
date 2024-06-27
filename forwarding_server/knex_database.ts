/**
 * @file  in_memory_database.ts
 */
import { IAccountDatabase } from "./idatabase"
import { AccountInfo} from "./types"

import Knex from 'knex';
import knexConfig from './knexfile;


// pass through
export class KnexDatabase implements IAccountDatabase
{
  constructor(config: knexConfig)
  {

    knex = Knex(config);
    const exists = await knex.schema.hasTable(tableName);
    if(!exists)
    {
      await knex.schema.createTable(tablename, (table) =>
      {
        table.increments('id').primary();
        table.string('account_name'); // key
        table.string('owner');
        table.string('repo');
        table.string('token');
      }
    }
  }

  create(key: string, value: AccountInfo): void
  {
    await knex('accounts').insert(value);
  }

  read(key: string): AccountInfo | undefined
  {
    const account = await knex(tableName).where({ account_name: key});
    AccountInfo accountinfo;

    accountInfo.owner = account.owner;
    accountInfo.repo = account.repo;
    accountInfo.token = account.token;

    return accountInfo;
  }

  update(key: string, value: AccountInfo): void
  {
      let partialQuery = knex('accounts').where({ account_name: key });
      await partialQuery.update({key, value.owner, value.repo, value.token});
  }

  del(key: string): void
  {
      let partialQuery = knex('accounts').where({ account_name: key });
      partialQuery.del();
  }

  private knex: Knex;
  private const tableName: string = 'accounts';
}

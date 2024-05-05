/**
 * @file  database.ts
 * interface for getting forwarding account info.
 */

import { AccountInfo} from "./types"

export interface IAccountDatabase
{
  get(key: string): AccountInfo | undefined;
  set(key: string, value: AccountInfo): void;
}

// pass through
export class InMemoryDatabase implements IAccountDatabase
{
  private database: Map<string, AccountInfo> = new Map<string, AccountInfo>();

  get(key: string): AccountInfo | undefined
  {
    console.log("getting " + key + " to db");
    return this.database.get(key);
  }

  set(key: string, value: AccountInfo): void
  {
    console.log("adding " + key + " to db");
    this.database.set(key, value);
  }
}

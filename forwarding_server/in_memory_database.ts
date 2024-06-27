/**
 * @file  in_memory_database.ts
 */
import { IAccountDatabase } from "./idatabase"
import { AccountInfo } from "./types"

// pass through
export class InMemoryDatabase implements IAccountDatabase
{
  private database: Map<string, AccountInfo> = new Map<string, AccountInfo>();

  create(key: string, value: AccountInfo): void
  {
    this.database.set(key, value);
  }

  read(key: string): AccountInfo | undefined
  {
    console.log("getting " + key + " to db");
    return this.database.get(key);
  }

  update(key: string, value: AccountInfo): void
  {
    if(!this.database.has(key))
      throw("No key " + key + ", bailing!")

    this.database.set(key, value);
  }

  delete(key: string): void
  {
    if(!this.database.has(key))
      return;
    this.database.delete(key);
  }
}

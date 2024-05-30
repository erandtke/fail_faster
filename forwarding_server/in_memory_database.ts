/**
 * @file  in_memory_database.ts
 */
import { IAccountDatabase } from "./idatabase"
import { AccountInfo} from "./types"

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

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



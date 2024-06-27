/**
 * @file  database.ts
 * interface for getting forwarding account info.
 */

import { AccountInfo} from "./types"

export interface IAccountDatabase
{
  create(key: string, value: AccountInfo): void;
  read(key: string): AccountInfo | undefined;
  update(key: string, value: AccountInfo): void;
  delete(key: string): void;
}

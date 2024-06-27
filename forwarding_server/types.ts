/**
 * @file  serialize.ts
 * converts to format for forwarding server
 */

export type UriData =
{
  account: string;
  error_code: string;
  context: string;
}

export type QrData =
{
  host: string;
  port: number;
  uri_data: UriData;
}

export type AccountInfo =
{
  owner: string;
  repo: string;
  token: string;
}

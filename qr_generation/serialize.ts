/**
 * @file  serialize.ts
 * converts to format for forwarding server
 */

type UriData =
{
  account: string;
  error_code: string;
  context: string;
}

type QrData =
{
  host: string;
  port: number;
  uri_data: UriData;
}

function generateURI(qr_data: QrData)
{
  var payload = 
  {
      a: qr_data.uri_data.account,
      e: qr_data.uri_data.error_code,
      c: qr_data.uri_data.context
  };

  var uri;

  uri = qr_data.host + ":" + qr_data.port + "/";
  uri+= JSON.stringify(payload);

  console.log("uri: " + uri)

  return uri
}

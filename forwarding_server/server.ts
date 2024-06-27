import * as helpers from './helpers'
import * as serialize from './serialize'
import { IAccountDatabase } from './idatabase'
import { InMemoryDatabase } from './in_memory_database'
import { AccountInfo, UriData } from './types'

import getopts from "getopts"
import{ Octokit } from "@octokit/core";

import { createServer } from 'node:http';


const hostname = '192.168.1.178';
const port = 3000;

// options
const options = getopts(process.argv.slice(2),
{
  alias:
  {
    debug: "d",
    help: "h",
    git_owner: "o",
    git_public_access_token: "t",
    git_repo: "r"
  }
})

if(options.h)
{
  helpers.printHelp();
  process.exit();
}

console.log('options: ' + JSON.stringify(options))

let db: IAccountDatabase = new InMemoryDatabase();
var demoAccountInfo = {} as AccountInfo;
demoAccountInfo.owner = options.git_owner;
demoAccountInfo.repo = options.git_repo;
console.log('setting demo account')
console.log(JSON.stringify(demoAccountInfo))
db.create('demo', demoAccountInfo);


// init
var handleReq = options.debug ? helpers.debug_forwardToGithub : helpers.forwardToGithub;

var publicAccessToken = options.git_public_access_token;

const octokit = new Octokit({auth: publicAccessToken});

const server = createServer((req, res) => {
  console.log('did stuff')
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  console.log('decoding uri')

  if (typeof req.url !== "string")
    return;

  var decodedURI: string = decodeURI(req.url).substring(1);
  console.log('decoded uri, ' + decodedURI)
  res.end('Hello World, req.method:' + req.method + ", req.url: " + decodedURI);
 
  if(!helpers.isJson(decodedURI))
  {
    return;
  }

  console.log('parsing')
  var uri_data: UriData = serialize.deserializeUriData(decodedURI);
  
  console.log('getting db goodies account')
  var accountInfo = db.read(uri_data.account);

  if(accountInfo == undefined)
  {
    console.log('undefined')
    return;
  }
  console.log('account info good!')

  var payload = helpers.toPayload(accountInfo.owner, accountInfo.repo, uri_data.error_code, uri_data.context)

  handleReq(octokit, payload)
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

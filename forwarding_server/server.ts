import * as helpers from './helpers'
import * as serialize from './serialize'
import { IAccountDatabase, InMemoryDatabase } from './database'
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
    token: "t",
    help: "h",
    git_owner: "o",
    git_public_access_token: "p",
    git_repo: "r"
  }
})

if(options.h)
{
  helpers.printHelp();
  process.exit();
}

let db: IAccountDatabase = new InMemoryDatabase();
var demoAccountInfo = {} as AccountInfo;
demoAccountInfo.owner = options.owner;
demoAccountInfo.repo = options.repo;
db.set('demo', demoAccountInfo);

console.log('options: ' + JSON.stringify(options))

// init
var handleReq = options.d ? helpers.debug_forwardToGithub : helpers.forwardToGithub;

var publicAccessToken = options.t;

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
  //var uri_data: UriData = serialize.deserializeUriData(decodedURI);
  var uri_data = serialize.deserializeUriData("I'm gay!");
  
  var accountInfo = db.get(uri_data.account);

  if(accountInfo == null)
  {
    return;
  }

  var payload = helpers.toPayload(accountInfo.owner, accountInfo.repo, uri_data.error_code, uri_data.context)

  handleReq(octokit, payload)
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

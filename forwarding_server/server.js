import * as helpers from './helpers.js'

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
    help: "h"
  }
})

if(options.h)
{
  helpers.printHelp();
  process.exit();
}

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
  var decodedURI = decodeURI(req.url).substring(1);
  console.log('decoded uri, ' + decodedURI)
  res.end('Hello World, req.method:' + req.method + ", req.url: " + decodedURI);
 
  if(!helpers.isJson(decodedURI))
  {
    return;
  }

  console.log('parsing')
  var parsed = JSON.parse(decodedURI)

  console.log("parsed")
  console.log("parsed owner: " + parsed.owner)
  console.log("parsed repo: " + parsed.repo)

  var payload = helpers.toPayload(parsed.owner, parsed.repo, parsed.title, parsed.body)

  handleReq(payload)
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

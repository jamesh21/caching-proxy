const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const ProxyServer = require('./proxy-server')

const argv = yargs(hideBin(process.argv))
  .option("port", {
    alias: "p",
    type: "number",
    description: "Port to run the server on",
    default: 3000,
  })
  .option("origin", {
    alias: "o",
    type: "string",
    description: "Origin URL to viist",
    default: "",
  }).argv;

console.log(argv.port, argv.origin)
const server = new ProxyServer(argv.origin, argv.port)
server.start()
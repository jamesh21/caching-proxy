require("dotenv").config();
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const ProxyServer = require('./proxy-server')
const cacheService = require("./cache-service");

yargs(hideBin(process.argv))
    .command(
        "*",// Command name and optional argument
        "Greet a user by name", // Command description
        (yargs) => {
            return yargs
            .positional("port", {
                describe: "Name of the person to greet",
                default: "3000",
            }).positional("origin", {
                describe: "Name of the person to greet",
            });
        },
        (argv) => {
            // Command handler
            const server = new ProxyServer(argv.origin, argv.port)
            server.start()
        }
    ).command(
        "clear",
        "Greet a user by name", // Command description
        (yargs) => {
            return yargs.positional("clear-cache", {
                describe: "Clears the cache",
            });
        },
        async() => {
            // Command handler
            try {
                console.log('flush cache');
                await cacheService.FLUSHDB()
            } catch(err) {
                console.error(err)
            }
        }
    )
    .argv;

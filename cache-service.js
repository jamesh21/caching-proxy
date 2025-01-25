const redis = require("redis");
const redisClient = redis.createClient({
    url: process.env.REDIS_CONNECTION_URL,
});

(async () => {
    redisClient.on("error", (err) => {
        console.error("redis client error", err);
    });

    redisClient.on("ready", () => {
        console.log("redis client started");
    });

    await redisClient.connect();
    await redisClient.ping();
})();

module.exports = redisClient;
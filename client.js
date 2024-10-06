const {Redis} = require("ioredis")

const client = new Redis();
// console.log("client", client)

module.exports = client;
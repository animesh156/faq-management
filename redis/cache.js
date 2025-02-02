const redis = require("redis");

const { createClient } = require("redis");

const redisClient = createClient({
  username: "default",
  password: "FfCYwRTvCQvWyc5vV2llcOzI88MKXiUL",
  socket: {
    host: "redis-12241.crce179.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 12241,
  },
});

redisClient
  .connect()
  .then(() => {
    console.log("✅ Redis connected successfully");
  })
  .catch((err) => {
    console.log("❌ Redis connection failed:", err);
  });

module.exports = redisClient;

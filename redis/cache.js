// client.js (CommonJS version)
const redis = require('redis');


const client = redis.createClient({
    username: 'default', // Default for Redis Cloud
    password: process.env.REDIS_PASSWORD, // Use .env for security
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT) // Ensure port is a number
    }
});

client.on('error', (err) => console.error('Redis Client Error', err));

const connectRedis = async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');

       
    } catch (error) {
        console.error('Redis Connection Failed ', error);
    }
};

// Call the connection function
connectRedis();

module.exports = client;

const { Queue } = require("bullmq");
const Redis = require("ioredis");

// Initialize Redis connection
const redisOptions = {
  maxRetriesPerRequest: null,
};

const redisConnection = new Redis(process.env.REDIS_URL || "redis://localhost:6379", redisOptions);

redisConnection.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Initialize the queue
const aiQueue = new Queue("ai-jobs", {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

module.exports = {
  redisConnection,
  aiQueue,
};

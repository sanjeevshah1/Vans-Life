import pino from "pino";
import dayjs from "dayjs";
// Create a pretty logger for development
const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true, // Color-code log levels
      },
    },
  });
const now = dayjs();
logger.info(`It's", ${now.format("HH:mm:ss")}`);
console.log("It's",now.format("HH:mm:ss"));
logger.info("Hello, world!");
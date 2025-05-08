import logger, { LoggerOptions } from "pino";
import dayjs from "dayjs";

// Create a custom logger with pretty transport and formatted timestamp
const log = logger({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true
        }
    },
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format("hh:mm:ss A")}"` // Format time with dayjs
} as LoggerOptions);

export default log;

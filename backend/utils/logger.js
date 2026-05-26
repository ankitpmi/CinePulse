
import winston from 'winston';
import LokiTransport from 'winston-loki';

export const logger = winston.createLogger({
  transports: [
    new LokiTransport({
      host: "http://loki:3100",
      labels: { app: 'api' },
      json: false,   // ← change to false
      format: winston.format.simple()
    }),
  ],
});
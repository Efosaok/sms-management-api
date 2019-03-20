import 'idempotent-babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import dotenv from 'dotenv'; // eslint-disable-line

dotenv.config();

const app = express();

const port = process.env.PORT || 1234;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

app.listen(port, () => logger.info(`API running on PORT ${port}`));

export default app;

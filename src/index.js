import 'idempotent-babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import dotenv from 'dotenv'; // eslint-disable-line
import swaggerUi from 'swagger-ui-express';

import sms from './routes/sms';
import contact from './routes/contact';

import swagegerDoc from '../swagger.json';

dotenv.config();

const app = express();

const port = process.env.PORT || 1234;

const swaggerDocument = {
  ...swagegerDoc,
  host: process.env.NODE_ENV === 'production' ? 'sms-management-api-efosa.herokuapp.com' : `localhost:${port}`,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

contact(app);
sms(app);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.status(200).send({ message: 'welcome to the sms-management api' }));

app.all('*', (req, res) =>
  res
    .status(200)
    .send({ message: 'oops, seems like you hit the wrong endpoint' }));

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

app.listen(port, () => logger.info(`API running on PORT ${port}`));

export default app;

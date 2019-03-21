import knex from 'knex';

import knexConfig from '../knexfile';
import errorHandler from '../helpers/errorHandler';

const knexInstance = knex(knexConfig);

class Sms {
  static async sendSms(
    {
      params: { sender, receiver },
      body: { message },
    },
    res,
  ) {
    try {
      await knexInstance('sms').insert({
        receiver,
        sender,
        message,
      });
      return res.status(200).send({
        message: 'sms successfully sent',
      });
    } catch (error) {
      const { status, errorMessage } = errorHandler(error);
      return res.status(status).send({
        errorMessage,
      });
    }
  }

  static async getSentSmsOfAContact({ params: { id } }, res) {
    try {
      const sentSms = await knexInstance('sms').where('sender', id);
      if (sentSms.length === 0) {
        return res.status(404).send({
          message: 'there is no sent sms for this contact',
        });
      }
      return res.status(200).send({
        message: 'all sent sms for contact found',
        sentSms,
      });
    } catch (error) {
      const { status, errorMessage } = errorHandler(error);
      return res.status(status).send({
        errorMessage,
      });
    }
  }

  static async getReceivedSmsOfAContact({ params: { id } }, res) {
    try {
      const sentSms = await knexInstance('sms').where('receiver', id);
      if (sentSms.length === 0) {
        return res.status(404).send({
          message: 'there is no received sms for this contact',
        });
      }
      return res.status(200).send({
        message: 'all received sms for contact found',
        sentSms,
      });
    } catch (error) {
      const { status, errorMessage } = errorHandler(error);
      return res.status(status).send({
        errorMessage,
      });
    }
  }
}

export default Sms;

import Sms from '../controllers/Sms';
import { validateSmsCreation } from '../middlewares/validateRequestCredentials';

const { sendSms, getReceivedSmsOfAContact, getSentSmsOfAContact } = Sms;

export default (app) => {
  app.post('/api/v1/sms/:sender/:receiver/send', validateSmsCreation, sendSms);
  app.get('/api/v1/sms/:id/received', getReceivedSmsOfAContact);
  app.get('/api/v1/sms/:id/sent', getSentSmsOfAContact);
};

import Contact from '../controllers/Contact';
import { validateContactCreation } from '../middlewares/validateRequestCredentials';

const { createContact, getContacts, deleteContact } = Contact;

export default (app) => {
  app.route('/api/v1/contact')
    .post(validateContactCreation, createContact)
    .get(getContacts);
  app.delete('/api/v1/contact/:id', deleteContact);
};

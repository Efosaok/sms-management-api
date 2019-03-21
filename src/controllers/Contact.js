import knex from 'knex';

import knexConfig from '../knexfile';
import errorHandler from '../helpers/errorHandler';

const knexInstance = knex(knexConfig);

class Contact {
  static async createContact({ body: { name, phoneNumber } }, res) {
    try {
      await knexInstance('contact').insert({ name, phoneNumber });
      return res.status(200).send({
        message: 'new contact successfully created',
      });
    } catch (error) {
      const { status, errorMessage } = errorHandler(error);
      return res.status(status).send({
        errorMessage,
      });
    }
  }

  static async getContacts(req, res) {
    try {
      const contacts = await knexInstance.select().from('contact');
      if (contacts.length === 0) {
        return res.status(404).send({
          error: 'you do not have any contacts yet',
        });
      }
      return res.status(200).send({
        message: 'contacts successfully fetched',
        contacts,
      });
    } catch (error) {
      const { status, errorMessage } = errorHandler(error);
      return res.status(status).send({
        errorMessage,
      });
    }
  }

  static async deleteContact({ params: { id } }, res) {
    try {
      const deletedContact = await knexInstance('contact').where('id', id).del();
      if (deletedContact !== 0) {
        return res.status(200).send({
          message: 'contact deleted successfully',
        });
      }
      return res.status(404).send({
        error: 'contact specified to be deleted does not seem to exist',
      });
    } catch (error) {
      const { status, errorMessage } = errorHandler(error);
      return res.status(status).send({
        errorMessage,
      });
    }
  }
}

export default Contact;

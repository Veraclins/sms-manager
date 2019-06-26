import response from '../helpers/response';
import {
  checkForRequiredFields,
  validatePhoneNumber,
} from '../helpers/validator';
import models from '../models';

const { Contact, Sms } = models;

export default {
  create: async (req, res, next) => {
    const requiredFields = ['name', 'phoneNumber'];
    const requiredFieldsErrors = checkForRequiredFields(
      req.body,
      requiredFields
    );
    if (requiredFieldsErrors) {
      return next(response.error.badInput(requiredFieldsErrors));
    }
    const { name, phoneNumber } = req.body;
    const invalidPhoneNumber = validatePhoneNumber(phoneNumber);
    if (invalidPhoneNumber) {
      return next(response.error.badInput(invalidPhoneNumber));
    }
    try {
      const data = await Contact.findOrCreate({
        where: { phoneNumber },
        defaults: {
          name,
        },
      }).spread((contact, created) => ({ contact, created }));
      const code = data.created ? 201 : 200;
      const action = data.created ? 'created' : 'fetched';
      return res
        .status(code)
        .json(response.success('contact', action, data.contact));
    } catch (error) {
      return next(error);
    }
  },
  getByPhoneNumber: async (req, res, next) => {
    const { phoneNumber } = req.params;
    const invalidPhoneNumber = validatePhoneNumber(phoneNumber);
    if (invalidPhoneNumber) {
      return next(response.error.badInput(invalidPhoneNumber));
    }

    try {
      const contact = await Contact.findOne({
        where: { phoneNumber },
        include: [
          {
            model: Sms,
            as: 'sent',
            attributes: ['id', 'receiverId', 'message'],
          },
          {
            model: Sms,
            as: 'received',
            attributes: ['id', 'senderId', 'message'],
          },
        ],
      });
      if (!contact) {
        return next(response.error.notFound('contact', 'phoneNumber'));
      }
      return res
        .status(200)
        .json(response.success('contact', 'fetched', contact));
    } catch (error) {
      return next(error);
    }
  },
  getMany: async (req, res, next) => {
    const { name } = req.query;
    let contacts = [];
    try {
      if (name) {
        contacts = await Contact.findAll({ where: { name } });
      } else {
        contacts = await Contact.findAll();
      }
      if (!contacts.length) {
        if (name) return next(response.error.notFound('contacts', 'name'));
        return next(response.error.empty('contacts'));
      }
      return res
        .status(200)
        .json(response.success('contacts', 'fetched', contacts));
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req, res, next) => {
    const { phoneNumber } = req.params;
    const invalidPhoneNumber = validatePhoneNumber(phoneNumber);
    if (invalidPhoneNumber) {
      return next(response.error.badInput(invalidPhoneNumber));
    }

    try {
      const contact = await Contact.destroy({ where: { phoneNumber } });
      if (!contact) {
        return next(response.error.notFound('contact', 'id'));
      }
      return res
        .status(200)
        .json(response.success('contact', 'deleted', contact));
    } catch (error) {
      return next(error);
    }
  },
};

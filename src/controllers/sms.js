import response from '../helpers/response';
import { checkForRequiredFields, validateMessage } from '../helpers/validator';
import models from '../models';

const { Sms, Contact } = models;

export default {
  send: async (req, res, next) => {
    const requiredFields = ['senderId', 'receiverId', 'message'];
    const requiredFieldsErrors = checkForRequiredFields(
      req.body,
      requiredFields
    );
    if (requiredFieldsErrors) {
      return next(response.error.badInput(requiredFieldsErrors));
    }
    const invalidMessage = validateMessage(req.body);
    if (invalidMessage) {
      return next(response.error.badInput(invalidMessage));
    }
    try {
      const { senderId, receiverId, message } = req.body;
      const sms = await Sms.create({ senderId, receiverId, message });
      return res.status(201).json(response.success('message', 'sent', sms));
    } catch (error) {
      return next(error);
    }
  },
  read: async (req, res, next) => {
    const { id } = req.params;
    try {
      const sms = await Sms.findOne({
        where: { id },
        include: [
          {
            model: Contact,
            as: 'sender',
            attributes: ['name', 'phoneNumber'],
          },
          {
            model: Contact,
            as: 'receiver',
            attributes: ['name', 'phoneNumber'],
          },
        ],
      });
      Sms.update({ status: 'read' }, { where: { id } });
      if (!sms) {
        return next(response.error.notFound('sms', 'id'));
      }
      return res.status(200).json(response.success('message', 'fetched', sms));
    } catch (error) {
      return next(error);
    }
  },
  getMany: async (req, res, next) => {
    const { senderId, receiverId } = req.query;
    let messages = [];
    try {
      if (senderId) {
        messages = await Sms.findAll({ where: { senderId } });
      } else if (receiverId) {
        messages = await Sms.findAll({ where: { receiverId } });
      } else {
        messages = await Sms.findAll();
      }
      if (!messages.length) {
        if (senderId) {
          return next(response.error.notFound('messages', 'senderId'));
        }
        if (receiverId) {
          return next(response.error.notFound('messages', 'receiverId'));
        }
        return next(response.error.empty('messages'));
      }
      return res
        .status(200)
        .json(response.success('messages', 'fetched', messages));
    } catch (error) {
      return next(error);
    }
  },
};

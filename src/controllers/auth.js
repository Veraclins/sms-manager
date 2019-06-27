import bcrypt from 'bcrypt';
import response from '../helpers/response';
import { checkForRequiredFields, validateUser } from '../helpers/validator';
import models from '../models';
import { createToken } from '../helpers/token';

const { User } = models;

export default {
  authenticate: async (req, res, next) => {
    const requiredFields = ['username', 'password'];
    const requiredFieldsErrors = checkForRequiredFields(
      req.body,
      requiredFields
    );
    if (requiredFieldsErrors) {
      return next(response.error.badInput(requiredFieldsErrors));
    }

    const invalidUser = validateUser(req.body);
    if (invalidUser) {
      return next(response.error.badInput(invalidUser));
    }

    const { username, password: plainPassword } = req.body;
    const password = bcrypt.hashSync(plainPassword, 6);
    try {
      const data = await User.findOrCreate({
        where: { username },
        defaults: {
          password,
        },
      }).spread((user, created) => ({ user, created }));
      const token = createToken(data.user);
      if (data.created) {
        return res
          .status(201)
          .json(response.success('user', 'signed up', { token }));
      }

      const validPassword = bcrypt.compare(plainPassword, data.user.password);
      if (!validPassword) {
        return next(
          response.error.unauthorized(
            'Wrong credentials! If you are trying to register, please use a different username'
          )
        );
      }
      return res
        .status(200)
        .json(response.success('user', 'logged in', { token }));
    } catch (error) {
      return next(error);
    }
  },
};

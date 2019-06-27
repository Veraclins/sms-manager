import response from '../helpers/response';
import { verifyToken } from '../helpers/token';

const authenticate = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return next(
      response.error.badInput({
        token:
          "You must supply an access token in the header of the request as 'x-access-token'",
      })
    );
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return next(response.error.unauthorized());
  }
  const { id, username } = payload;
  req.user = { id, username };
  return next();
};

export default authenticate;

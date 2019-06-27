import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
export const createToken = user => {
  const { id, username } = user;
  const token = jwt.sign({ id, username }, secret, {
    expiresIn: 259200, // expires in 72 hours
  });
  return token;
};

export const verifyToken = async token =>
  jwt.verify(token, secret, (err, decoded) => decoded);

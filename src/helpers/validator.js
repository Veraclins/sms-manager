import { humanize } from '.';

export const checkForRequiredFields = (body, requiredFields) => {
  const errors = {};
  const fields = {};

  // Removes empty spaces
  Object.entries(body).forEach(([key, value]) => {
    fields[key] = value.toString().trim();
  });
  // Checks that all required fields are present
  requiredFields.forEach(field => {
    if (!(field in fields)) {
      errors[field] = [humanize(`${field} is required`)];
    }
  });
  // throws the error (if any)
  if (Object.keys(errors).length !== 0) {
    return errors;
  }
  return false;
};

export const validatePhoneNumber = phoneNumber => {
  const errors = [];
  if (phoneNumber.length !== 10) {
    errors.push('Phone numbers must be exactly ten digits');
  }
  if (phoneNumber[0] !== '0') {
    errors.push('Phone numbers must start with `0`');
  }
  if (/\D/.test(phoneNumber)) {
    errors.push('Phone numbers must only contain digits');
  }
  if (errors.length) return { phoneNumber: errors };
  return false;
};

export const validateMessage = body => {
  const { senderId, receiverId, message } = body;
  const errors = {};
  if (!Number(senderId)) {
    errors.sender = ["Sender id must be a number (the sender's id)"];
  }
  if (!Number(receiverId)) {
    errors.receiver = ["Receiver id must be a number (the receiver's id)"];
  }
  if (message.length > 200) {
    errors.message = ['Message cannot be more than 200 characters'];
  }
  if (Object.keys(errors).length !== 0) {
    return errors;
  }
  return false;
};

export const validateUser = body => {
  const { username, password } = body;
  const errors = {};
  if (username && username.length < 3) {
    errors.message = ['username should be at least three (3) characters'];
  }
  if (password && password.length < 6) {
    errors.message = ['password should be at least six (6) characters'];
  }
  if (Object.keys(errors).length !== 0) {
    return errors;
  }
  return false;
};

import ApplicationError from './Error';
import { sentenceCase, humanize } from '.';

export default {
  error: {
    empty: resource =>
      new ApplicationError(
        `Oops, looks like no ${resource} exist yet! Create some first!`,
        404
      ),
    badInput: errors =>
      new ApplicationError(
        `Oops, looks like there are issues in the input`,
        400,
        errors
      ),
    notFound: (resource, field) =>
      new ApplicationError(
        `Oops, no ${resource} with this ${humanize(field)} found`,
        404
      ),
    unauthorized: message =>
      new ApplicationError(
        message || 'Your access is invalid or expired. Please login again',
        401
      ),
  },
  success: (resource, action, data = {}) => ({
    status: 'success',
    message: `${sentenceCase(`${resource} ${action} successfully`)}`,
    data,
  }),
};

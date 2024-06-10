import { Response } from 'express';

export const RequestFailed = (
  res: Response,
  code: number,
  error: string,
  id?: number | string
) => {
  let composeMessage = '';

  if (code === 400) {
    composeMessage = `${error} Cannot Be Null`;
  } else if (code === 401) {
    composeMessage = error;
  } else if (code === 404) {
    if (id) {
      composeMessage = `${error} Not Found With Id ${id}`;
    } else {
      composeMessage = `${error} Not Found`;
    }
  } else if (code === 405) {
    composeMessage = `${error} Cannot Be Negative`;
  } else if (code === 406) {
    composeMessage = `${error}`;
  } else if (code === 401 || code === 403) {
    composeMessage = error;
  } else if (code === 407) {
    composeMessage = error;
  } else if (code === 409) {
    composeMessage = error;
  } else if (code === 422) {
    composeMessage = ` ${error} Is Invalid `;
  }

  res.status(code).json({
    success: false,
    message: composeMessage
  });
};

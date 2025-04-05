import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { APIErrorResponse } from '@types';

const ErrorMessage = ({
  error,
}: {
  error: FetchBaseQueryError | SerializedError | APIErrorResponse;
}) => {
  let errMsg = 'An unknown error occurred';

  if (!error) return null;

  if ('status' in error) {
    if ('data' in error && error.data && typeof error.data === 'object') {
      const data = error.data as APIErrorResponse;

      if (data.errors && Array.isArray(data.errors)) {
        errMsg = data.errors.map((err) => err.msg).join(', ');
      } else if (data.message) {
        errMsg = data.message;
      } else {
        errMsg = JSON.stringify(data);
      }
    }
  } else if ('message' in error) {
    errMsg = error.message || 'An unknown error occurred';
  }

  return <p style={{ color: '#FF3333', margin: '10px 0' }}>{errMsg}</p>;
};

export default ErrorMessage;

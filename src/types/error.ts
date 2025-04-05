import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type ValidationError = {
  type?: string;
  value?: string;
  msg: string;
  path?: string;
  location?: string;
};

export type APIErrorResponse = {
  errors?: ValidationError[]; // Express Validator errors
  error?: string | object; // General error message
  status?: number; // HTTP status code
  message?: string; // Error message
  stack?: string; // Debugging info (optional)
};

export type ErrorResponse =
  | FetchBaseQueryError
  | SerializedError
  | APIErrorResponse;

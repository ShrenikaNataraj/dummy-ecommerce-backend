import { StatusCodes } from '../../types';

export class HttpError extends Error {
  statusCode: StatusCodes;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

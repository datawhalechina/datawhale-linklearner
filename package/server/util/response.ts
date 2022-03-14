import { Response } from 'express';

export enum STATUS_CODE {
  SUCCESS = 200,
  UNKNOWN_ERROR = 5000,
  BAD_REQUEST = 5001
}

const sendResponse = (
  res: Response,
  httpCode: number,
  data: any,
  message: string,
  statusCode: STATUS_CODE
) => {
  return res.status(httpCode).json({ status: statusCode, data, message });
};

export const sendSuccessResponse = (res: Response, data: any, message?: string) => {
  return sendResponse(res, 200, data, message || 'success', STATUS_CODE.SUCCESS);
};

export const sendErrorResponse = (res: Response, message: string, statusCode?: STATUS_CODE) => {
  return sendResponse(res, 500, {}, message, statusCode || STATUS_CODE.UNKNOWN_ERROR);
};

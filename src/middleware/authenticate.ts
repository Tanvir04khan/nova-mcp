import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { ErrorModel } from "../models/errorModel";
import { APIStatus, StatusCode } from "../utils";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const secretKey = req.headers.authorization;

    if (secretKey !== env.SERVER_KEY) {
      throw new ErrorModel(
        "Not Authorized.",
        StatusCode.UNAUTHORIZED,
        APIStatus.ERROR,
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

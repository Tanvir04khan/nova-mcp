import { NextFunction, Request, Response } from "express";
import { ErrorModel } from "../../models/errorModel";
import { APIStatus, StatusCode } from "../../utils";
import { sendEmail } from "../../services/email";
import { ResponseModel } from "../../models/responseModel";

export const processEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;

    if (body.eventName === "send_email") {
      const gmailRefreshToken = req.headers["x-gmail-refresh-token"];

      if (!gmailRefreshToken) {
        throw new ErrorModel(
          "x-gmail-refresh-token is required.",
          StatusCode.UNAUTHORIZED,
          APIStatus.ERROR,
        );
      }

      console.log(req.body);

      const response = await sendEmail(
        gmailRefreshToken as string,
        req.body,
        next,
      );

      return res
        .status(StatusCode.OK)
        .json(
          new ResponseModel(
            null,
            APIStatus.SUCCESS,
            StatusCode.OK,
            "Email sent successfully.",
          ),
        );
    }

    throw new ErrorModel(
      `${body.eventName} this service is not available.`,
      StatusCode.NOT_FOUND,
      APIStatus.ERROR,
    );
  } catch (error) {
    next(error);
  }
};

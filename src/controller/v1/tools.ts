import { NextFunction, Request, Response } from "express";
import { APIStatus, StatusCode } from "../../utils";
import { ResponseModel } from "../../models/responseModel";

const tools = {
  tools: [
    {
      eventName: "send_email",
      description: "Send an email",
      inputSchema: {
        type: "object",
        properties: {
          eventName: { type: "string" },
          to: { type: "string" },
          subject: { type: "string" },
          body: { type: "string" },
        },
      },
    },
  ],
};

export const getTools = (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(StatusCode.OK)
      .json(
        new ResponseModel(
          tools,
          APIStatus.SUCCESS,
          StatusCode.OK,
          "Tools found.",
        ),
      );
  } catch (error) {
    next(error);
  }
};

import { google } from "googleapis";
import { createGoogleClient } from "../config/google";
import { EmailInput } from "../type";
import { NextFunction } from "express";
import { ErrorModel } from "../models/errorModel";
import { APIStatus, StatusCode } from "../utils";

export const sendEmail = async (
  gmailRefreshToken: string,
  input: EmailInput,
  next: NextFunction,
) => {
  try {
    if (!input.to || !input.body) {
      throw new ErrorModel(
        "Email body is invalid.",
        StatusCode.BAD_REQUEST,
        APIStatus.ERROR,
      );
    }

    const auth = createGoogleClient(gmailRefreshToken);

    const gmail = google.gmail({
      version: "v1",
      auth,
    });

    const email = [
      `To: ${input.to}`,
      `Subject: ${input.subject}`,
      "",
      input.body,
    ].join("\n");

    const encodedMessage = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    return res;
  } catch (error) {
    next(error);
  }
};

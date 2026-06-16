import { env } from "./config/env";

export const getOrigin = () => {
  if (env.ENV === "production") {
    return env.ORIGIN;
  }
  return "http://localhost:3000";
};

export enum APIStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  SERVER_ERROR = 500,
}

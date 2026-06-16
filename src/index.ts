import express, { json, urlencoded } from "express";
import { getOrigin } from "./utils";

import cors from "cors";
import cookieParser from "cookie-parser";
import { getTools } from "./controller/v1/tools";
import { authenticate } from "./middleware/authenticate";
import { processEvent } from "./controller/v1/processEvent";

const app = express();

app
  .disable("x-powered-by")
  .use(urlencoded({ extended: true }))
  .use(cors({ origin: getOrigin(), credentials: true }))
  .use(json())
  .use(cookieParser());

app.get("/", (_, res) => {
  res.send("NovaAI MCP Server Running");
});

app.get("/api/v1/tools", authenticate, getTools);

app.post("/api/v1/tools/trigger-event", authenticate, processEvent);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

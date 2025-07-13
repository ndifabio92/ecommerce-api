import "dotenv/config";
import { get } from "env-var";

export const envs = {
  port: get("PORT").asPortNumber() || 8080,
  development: get("DEVELOPMENT").asBool() || false,
  corsOrigin:
    get("CORS_ORIGIN").required().asString() || "http://localhost:8080",
  mongoDbUri: get("MONGODB_URI").required().asString(),
};

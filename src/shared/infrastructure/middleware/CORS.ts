import cors from "cors";

import { HttpMethod } from "../utils/HttpMethod";
import { envs } from "../../config/envs";

const isOriginAllowed = (
  origin: string | undefined,
  allowedOrigins: string[]
): boolean => {
  if (!origin) {
    return false;
  }
  return allowedOrigins.includes(origin);
};

const getCorsOptions = (): cors.CorsOptions => {
  const isDevelopment = envs.development;
  const allowedOrigins = envs.corsOrigin.split(",") || [];

  if (isDevelopment) {
    return {
      origin: "*",
      methods: [
        HttpMethod.GET,
        HttpMethod.POST,
        HttpMethod.PUT,
        HttpMethod.DELETE,
      ],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    };
  }

  return {
    origin: (origin, callback) => {
      if (isOriginAllowed(origin, allowedOrigins)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin "${origin}" is not allowed.`));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  };
};

export const corsMiddleware = cors(getCorsOptions());

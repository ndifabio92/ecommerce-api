import express, { Express, ErrorRequestHandler } from "express";
import { envs } from "../infrastructure/config/envs";
import { errorHandler } from "../middleware/errorHandler";
import { corsMiddleware } from "../middleware/cors";
import router from "./routes";

export const createServer = async (): Promise<Express> => {
  const app: Express = express();
  const port: number = envs.port;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(corsMiddleware);
  app.use("/api/v1", router);
  app.use(errorHandler as ErrorRequestHandler);

  return new Promise((resolve, reject) => {
    app
      .listen(port, () => {
        console.log(`Server running on port ${port}`);
        resolve(app);
      })
      .on("error", (err) => {
        console.error("Failed to start server:", err.message);
        reject(err);
      });
  });
};

export const startServer = async (): Promise<Express> => {
  return createServer();
};

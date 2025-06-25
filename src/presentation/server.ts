import express, { Express, ErrorRequestHandler } from "express";
import { envs } from "../infrastructure/config/envs";
import { errorHandler } from "../middleware/errorHandler";
import { corsMiddleware } from "../middleware/cors";
import router from "./routes";
import homeRouter from './home/homeRoutes'
import path from "path";
import { engine } from "express-handlebars";
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { productsSocketController } from './products/productsSocketController';

export const createServer = async (): Promise<Express> => {
  const app: Express = express();
  const port: number = envs.port;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(corsMiddleware);
  app.use("/api/v1", router);
  app.use(errorHandler as ErrorRequestHandler);

  // Handlebars setup
  app.engine('handlebars', engine());
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, '../views'));

  // Static files
  app.use('/js', express.static(path.join(__dirname, '../public/js')));

  app.use('/', homeRouter);

  // NUEVO: Crear servidor HTTP y Socket.io
  const server = http.createServer(app);
  const io = new SocketIOServer(server);

  io.on('connection', (socket) => {
    productsSocketController(io, socket);
  });

  return new Promise((resolve, reject) => {
    server
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

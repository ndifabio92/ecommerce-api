import express, { Express, ErrorRequestHandler } from "express";
import { envs } from "../infrastructure/config/envs";
import { errorHandler } from "../middleware/errorHandler";
import { corsMiddleware } from "../middleware/cors";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../infrastructure/config/swagger";

export class Server {
  private static instance: Server;
  private app: Express;
  private readonly port: number;

  private constructor() {
    this.app = express();
    this.port = envs.port;

    // Configuración inicial
    this.configureMiddleware();
    this.configureRoutes();
  }

  public static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  private configureMiddleware(): void {
    // Middleware básico
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(corsMiddleware);

    // Headers de seguridad
    this.app.use((req, res, next) => {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("X-Frame-Options", "DENY");
      res.setHeader("X-XSS-Protection", "1; mode=block");
      next();
    });
  }

  private configureRoutes(): void {
    // Documentación Swagger
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Rutas de la API
    this.app.use("/api/v1", router);
    this.app.use(errorHandler as ErrorRequestHandler);
  }

  public getApp(): Express {
    return this.app;
  }

  public async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.app
        .listen(this.port, () => {
          console.log(`Server running on port ${this.port}`);
          console.log(
            `Swagger documentation available at http://localhost:${this.port}/api-docs`
          );
          resolve();
        })
        .on("error", (err) => {
          console.error("Failed to start server:", err.message);
          reject(err);
        });
    });
  }
}

// Exportar una instancia única del servidor
export const server = Server.getInstance();

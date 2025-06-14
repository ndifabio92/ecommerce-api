import express, { Express } from "express";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { envs } from "./envs";

export const configureServer = (app: Express): void => {
  // Configuración de seguridad básica
  app.use(helmet());

  // Compresión de respuestas
  app.use(compression());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // límite de 100 peticiones por ventana
    message: "Demasiadas peticiones desde esta IP, por favor intente más tarde",
  });
  app.use(limiter);

  // Configuración de express
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Configuración de headers
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });
};

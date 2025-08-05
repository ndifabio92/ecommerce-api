import path from "path";
import http from "http";
import express, { ErrorRequestHandler } from "express";
import passport from "passport";
import { connectToDatabase } from "./shared/config/mongodb";
import { engine } from "express-handlebars";
import { Server as SocketIOServer } from "socket.io";
import { envs } from "./shared/config/envs";
import HomeRouter from "./features/home/infrastructure/routes/HomeRouter";
import ApiRouter from "./shared/infrastructure/routes/ApiRouter";
import { ProductSocketController } from "./features/products/infrastructure/controllers/ProductSocketController";
import { CartSocketController } from "./features/cart/infrastructure/controllers/CartSocketController";
import { corsMiddleware } from "./shared/infrastructure/middleware/CORS";
import { errorHandler } from "./shared/infrastructure/middleware/ErrorHandler";
import "./features/auth/infrastructure/strategies/PassportConfig";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

// Inicializar Passport
app.use(passport.initialize());

app.use("/api/v1", ApiRouter);
app.use(errorHandler as ErrorRequestHandler);

// Handlebars setup
app.engine(
  "handlebars",
  engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      eq: function (a: any, b: any) {
        return a === b;
      },
      gt: function (a: any, b: any) {
        return a > b;
      },
      multiply: function (a: any, b: any) {
        return (a * b).toFixed(2);
      },
    },
  })
);
app.set("view engine", "handlebars");
app.set(
  "views",
  path.join(__dirname, "../src/shared/infrastructure/templates")
);

// Static files
app.use(
  "/js",
  express.static(path.join(__dirname, "../src/shared/infrastructure/static/js"))
);

app.use("/", HomeRouter);

// NUEVO: Crear servidor HTTP y Socket.io
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);
  ProductSocketController(io, socket);
  CartSocketController(io, socket);
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

async function startServer() {
  try {
    await connectToDatabase();

    server.listen(envs.port, () => {
      console.log(`🚀 Server running on port ${envs.port}`);
      console.log(`Health check: http://localhost:${envs.port}/health`);
      console.log(`Socket.IO server ready`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

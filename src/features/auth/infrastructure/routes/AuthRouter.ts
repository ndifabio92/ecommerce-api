import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { LoginUseCase } from "../../application/use-cases/LoginUseCase";
import { ValidateTokenUseCase } from "../../application/use-cases/ValidateTokenUseCase";
import { JwtAuthRepository } from "../repositories/JwtAuthRepository";
import { authMiddleware } from "../middleware/AuthMiddleware";
import { passportJwtMiddleware } from "../middleware/PassportMiddleware";
import "../strategies/PassportConfig"; // Inicializar estrategias de Passport

const AuthRouter = Router();
const authRepository = new JwtAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);
const validateTokenUseCase = new ValidateTokenUseCase(authRepository);
const authController = new AuthController(loginUseCase, validateTokenUseCase);

// Ruta de login
AuthRouter.post("/login", (req, res) => authController.login(req, res));

// Ruta /current con estrategia Passport (cumple con el criterio de usar Passport)
AuthRouter.get("/current", passportJwtMiddleware, (req, res) =>
  authController.current(req, res)
);

export default AuthRouter;
